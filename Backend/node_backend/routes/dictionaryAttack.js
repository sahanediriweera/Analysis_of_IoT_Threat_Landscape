const express = require('express');
const dictionaryAttackController = require('../controllers/dictionaryAttackController');
const router = express.Router();


router.get('/', dictionaryAttackController.handleGetRequestWithoutParams);
router.get('/:ip/:port',dictionaryAttackController.handleGetRequestWithParams );

module.exports = router;
