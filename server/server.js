const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const db = require('../db/db');

const app = express();
const port = 3003;
app.use(compression());
app.use(express.static('./public'));
app.use('/app/:listings', express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(cors());

app.get('/getListings', (req, res) => {
  const { query } = req;
  const { ID, monthID } = query;
  db.getListings(ID, monthID, (data) => {
    res.send(data);
  });
});

app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/bundle.js'));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
