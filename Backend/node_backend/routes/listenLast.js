const express = require('express');
const router = express.Router();
const handleGetRequest = require('./../controllers/listenLastController');

router.get('/',handleGetRequest );

module.exports = router;