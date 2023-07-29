const express = require('express');
const router = express.Router();
const handleGetRequests = require('./../controllers/textEncryptionController');


router.get('/',handleGetRequests );

module.exports = router;