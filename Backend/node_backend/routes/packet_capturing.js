const express = require('express');
const router = express.Router();
const handleGetRequest = require('./../controllers/packetCapturingController');

router.get('/', handleGetRequest);

module.exports = router;