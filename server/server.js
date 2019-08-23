const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../db/db');

const app = express();
const port = 3000;
app.use(express.static('./public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/api/listings', (req, res) => {
  const { query } = req;
  const { ID, monthID } = query;
  db.getListings(ID, monthID, (data) => {
    res.send(data);
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
