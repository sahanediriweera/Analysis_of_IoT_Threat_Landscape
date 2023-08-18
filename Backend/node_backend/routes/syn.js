const express = require('express');
const dictionaryAttackController = require('../controllers/synController');
const router = express.Router();


router.get('/', dictionaryAttackController);

module.exports = router;
