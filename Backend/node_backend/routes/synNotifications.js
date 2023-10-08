const express = require('express');
const httpAttackController = require('../controllers/synNotificationController');
const router = express.Router();

router.get('/', httpAttackController);

module.exports = router;
