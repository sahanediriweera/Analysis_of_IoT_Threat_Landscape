const express = require('express');
const dictionaryAttackController = require('../controllers/ICMPController');
const router = express.Router();


router.get('/', dictionaryAttackController);

module.exports = router;
