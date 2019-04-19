const express = require('express');
const router = express.Router();

const {getLatLngFromAddress} = require("../controllers/geocoding.controller");

router.get('/', getLatLngFromAddress);

module.exports = router;
