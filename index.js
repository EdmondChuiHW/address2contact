const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const index = require('./routes/index');
const address = require('./routes/address');
const wards = require('./routes/wards');
const councillors = require('./routes/councillors');

app.use('/', index);
app.use('/address', address);
app.use('/wards', wards);
app.use('/councillors', councillors);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

