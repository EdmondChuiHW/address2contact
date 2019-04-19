const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const indexRouter = require('./routes/index');
const addressRouter = require('./routes/address');

app.use('/', indexRouter);
app.use('/address', addressRouter);
app.get('', () => {

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

