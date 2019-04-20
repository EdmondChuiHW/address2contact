const express = require('express');
const router = express.Router();

const {getWards} = require("../controllers/wards.controller");

router.get('/', getWards);

module.exports = router;
