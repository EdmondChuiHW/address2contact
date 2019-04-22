const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const index = require('./routes/index');
const address2councillor = require('./routes/address2councillor');

app.use(cors({origin: "https://chuihinwai.github.io/email-contact/"}));
app.use('/', index);
app.use('/address2councillor', address2councillor);

app.listen(port, () => console.log(`Listening on port ${port}!`));

