const express = require('express');
const dictionaryAttackController = require('../controllers/ICMPController');
const router = express.Router();


router.get('/', dictionaryAttackController.handleGetRequestWithoutParams);
router.get('/:ip',dictionaryAttackController.handleGetRequestWithParams );

module.exports = router;
