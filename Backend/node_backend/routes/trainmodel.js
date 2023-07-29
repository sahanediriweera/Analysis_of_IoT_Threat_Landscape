const express = require('express');
const router = express.Router();
const handleGetRequests = require('./../controllers/trainModelController');

router.get('/', handleGetRequests);

module.exports = router;