const express = require('express');
const udpAttackController = require('../controllers/udpController');
const router = express.Router();


router.get('/', udpAttackController);

module.exports = router;
