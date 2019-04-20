const express = require('express');
const router = express.Router();

const {getCouncillorByAddress} = require("../controllers/address2councillor.controller");

router.get('/', getCouncillorByAddress);

module.exports = router;
