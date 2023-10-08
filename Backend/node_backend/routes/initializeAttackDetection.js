const express = require('express');
const router = express.Router();
const handleGetRequest = require('./../controllers/initializeAttackDetectionController');

router.get('/', handleGetRequest);

module.exports = router;