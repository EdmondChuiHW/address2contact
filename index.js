const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const indexRouter = require('./routes/index');
const addressRouter = require('./routes/address');
const wardsRouter = require('./routes/wards');

app.use('/', indexRouter);
app.use('/address', addressRouter);
app.use('/wards', wardsRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

