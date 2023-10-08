const express = require('express');
const httpAttackController = require('../controllers/udpNotificationController');
const router = express.Router();

router.get('/', httpAttackController);

module.exports = router;
