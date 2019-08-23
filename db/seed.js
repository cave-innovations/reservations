const mysql = require('mysql');
const createTables = require('./config');
const Promise = require('bluebird');
const database = 'reservation';

const connection = mysql.createConnection({
  user: 'root',
  password: ''
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

// Using only months August, September, and October
// number of days in the month
const numDays = [31, 30, 31];
// starting day of the week : 1 = Monday, 2 = Tuesday etc.
const startDays = [4, 7, 2];

db.connectAsync()
  .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
  .then(() => db.queryAsync(`DROP DATABASE IF EXISTS ${database}`))
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db))
  .then(() => {
    // create 100 listings
    for (let i = 1; i <= 100; i++) {
      let name = "Palace";
      let pricing = Math.floor(Math.random()*60) + 16;
      let maxGuests = Math.floor(Math.random()*10) + 1;
      let stars = Math.floor(Math.random()*5) + 1;
      let reviews = Math.floor(Math.random()*250) + 1;
      let views = Math.floor(Math.random()*500) + 1;
      let query = `INSERT INTO listings (name, pricing, maxGuests, stars, reviews, views) VALUES ('${name}', ${pricing}, ${maxGuests}, ${stars}, ${reviews}, ${views})`;
      db.queryAsync(query)
        .then(() => {
          // populate dates table for 3 months
          for (let j = 0; j < 3; j++) {
            for (let k = 0; k < numDays[j]; k++) {
              // randomize availability
              let blackedOut = Math.floor(Math.random()*2);
              if (blackedOut) {
                db.queryAsync(`INSERT INTO dates (available, monthID, listingID) VALUES (false, ${j}, ${i})`);
              } else {
                console.log(i, j , k)
                db.queryAsync(`INSERT INTO dates (available, monthID, listingID) VALUES (true, ${j}, ${i})`);
              }
            }
          }
        })
    }
  })

module.exports = db;