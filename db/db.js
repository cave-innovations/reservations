const mysql = require('mysql');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root',
  password: 'password',
  database: 'reservations',
});

const db = Promise.promisifyAll(connection, { multiArgs: true });
db.connect();

const getListings = (id, month, callback) => {
  const query = `SELECT name, pricing, maxGuests, views reviews, stars FROM listings WHERE id = ${id}`;
  db.query(query, (err1, listing) => {
    db.query(`SELECT available from dates WHERE listingID = ${id} AND monthID = ${month}`, (err2, dates) => {
      callback({ listing, dates });
    });
  });
};

module.exports = {
  getListings,
};
