const express = require('express');
const router = express.Router();
const handleGetRequest = require('./../controllers/inferenceController');

router.get('/', handleGetRequest);

module.exports = router;