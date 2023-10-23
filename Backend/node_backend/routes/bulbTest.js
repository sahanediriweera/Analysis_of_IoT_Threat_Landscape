const express = require('express');
const dictionaryAttackController = require('../controllers/bulbtestController');
const router = express.Router();


router.get('/', dictionaryAttackController.handleGetRequestWithoutParams);
router.get('/:ip/:port',dictionaryAttackController.handleGetRequestWithParams );

module.exports = router;
