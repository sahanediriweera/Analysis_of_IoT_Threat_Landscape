const express = require('express');
const router = express.Router();
const handleGetRequest = require('./../controllers/csv2featreDataController');

router.get('/',handleGetRequest);

module.exports = router;