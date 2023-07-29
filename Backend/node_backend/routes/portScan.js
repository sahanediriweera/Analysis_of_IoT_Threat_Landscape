const express = require('express');
const router = express.Router();
const handleGetRequests = require('./../controllers/portScanController');

router.get('/ip', handleGetRequests.handleGetWithParams);
router.get('/', handleGetRequests.handleGetWithoutParams);

module.exports = router;