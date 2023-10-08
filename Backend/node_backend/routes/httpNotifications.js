const express = require('express');
const httpAttackController = require('../controllers/httpNotificationController');
const router = express.Router();

router.get('/', httpAttackController);

module.exports = router;
