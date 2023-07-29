const express = require('express');
const router = express.Router();
const handleGetRequest = require('./../controllers/pcap2csvController');

router.get('/', handleGetRequest);

module.exports = router;