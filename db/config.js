const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }
  // Create listings table
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS listings (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      pricing INT,
      maxGuests INT,
      views INT,
      reviews INT,
      stars INT
    );`)
    // Create dates table
    .then(() => (`
        CREATE TABLE IF NOT EXISTS dates (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          available BOOLEAN DEFAULT TRUE,
          monthID INT,
          listingID INT
        );`))
    .error((err) => {
      console.log(err);
    });
};