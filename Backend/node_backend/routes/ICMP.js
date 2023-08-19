const express = require('express');
const ICMPAttackController = require('../controllers/ICMPController');
const router = express.Router();


router.get('/', ICMPAttackController);

module.exports = router;
