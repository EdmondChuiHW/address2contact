const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/address2councillor');
});

module.exports = router;
