const express = require('express');
const router = express.Router();
const handleGetRequest = require('./../controllers/networkScanController');

router.get('/',handleGetRequest );

module.exports = router;