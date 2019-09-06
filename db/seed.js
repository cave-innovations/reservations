const mysql = require('mysql');
const Promise = require('bluebird');
const faker = require('faker');
const createTables = require('./config');

const database = 'reservations';

const connection = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root',
  password: 'password',
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

// Using only months August, September, and October
// number of days in the month
const numDays = [31, 28, 31, 30, 31, 30, 31, 30, 30, 31, 30, 31];

db.connectAsync()
  .then(() => db.queryAsync(`DROP DATABASE IF EXISTS ${database}`))
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db))
  .then(() => {
    // create 100 listings
    for (let i = 1; i <= 100; i += 1) {
      const name = faker.address.streetName();
      const pricing = Math.floor(Math.random() * 60) + 16;
      const maxGuests = Math.floor(Math.random() * 10) + 1;
      const stars = Math.floor(Math.random() * 5) + 1;
      const reviews = Math.floor(Math.random() * 250) + 1;
      const views = Math.floor(Math.random() * 500) + 1;
      const query = `INSERT INTO listings (name, pricing, maxGuests, stars, reviews, views) VALUES (${db.escape(name)}, ${pricing}, ${maxGuests}, ${stars}, ${reviews}, ${views})`;
      db.queryAsync(query)
        .then(() => {
          // populate dates table for 3 months
          for (let j = 0; j < 12; j += 1) {
            for (let k = 0; k < numDays[j]; k += 1) {
              // randomize availability
              const blackedOut = Math.floor(Math.random() * 2);
              if (blackedOut) {
                db.queryAsync(`INSERT INTO dates (available, monthID, listingID) VALUES (false, ${j}, ${i})`);
              } else {
                db.queryAsync(`INSERT INTO dates (available, monthID, listingID) VALUES (true, ${j}, ${i})`);
              }
            }
          }
        });
    }
  });

module.exports = db;
