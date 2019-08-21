const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = 3000;
app.use(express.static('./public'));

morgan('common');

app.listen(port, () => console.log(`App listening on port ${port}!`))