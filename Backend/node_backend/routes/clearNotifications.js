const express = require('express');
const router = express.Router();
const handleGetRequest = require('./../controllers/clearNotificationsController');

router.get('/',handleGetRequest);

module.exports = router;