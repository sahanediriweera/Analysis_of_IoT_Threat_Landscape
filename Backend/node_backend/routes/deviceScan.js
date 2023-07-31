const express = require('express');
const router = express.Router();
const handleGetRequest = require('./../controllers/deviceScanController');

router.get('/',handleGetRequest );

module.exports = router;