const express = require('express');
const router = express.Router();

const {getCouncillorByWardNumber} = require("../controllers/councillors.controller");

router.get('/', getCouncillorByWardNumber);

module.exports = router;
