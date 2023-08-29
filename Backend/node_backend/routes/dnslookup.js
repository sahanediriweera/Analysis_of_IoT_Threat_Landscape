const express = require('express');
const router = express.Router();
const handleGetRequest = require('./../controllers/dnsLookUpController');

router.get('/',handleGetRequest );

module.exports = router;