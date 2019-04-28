require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const index = require('./routes/index');
const address2councillor = require('./routes/address2councillor');

app.use(cors({origin: [/^https:\/\/chuihinwai.github.io/, /^https:\/\/localhost/]}));
app.use('/', index);
app.use('/address2councillor', address2councillor);

module.exports = app;
