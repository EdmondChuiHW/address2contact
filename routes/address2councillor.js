const express = require('express');
const router = express.Router();

const {getCouncillorByWardNumber} = require("../controllers/address2councillor.controller");

router.get('/', getCouncillorByWardNumber);

module.exports = router;
