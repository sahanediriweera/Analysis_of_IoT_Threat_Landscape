const express = require('express');
const dictionaryAttackController = require('../controllers/udpController');
const router = express.Router();


router.get('/', dictionaryAttackController);

module.exports = router;
