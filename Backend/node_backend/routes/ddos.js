const express = require('express');
const dictionaryAttackController = require('../controllers/ddosController');
const router = express.Router();


router.get('/', dictionaryAttackController.handleGetRequestWithoutParams);
router.get('/:ip/:fake_ip',dictionaryAttackController.handleGetRequestWithParams );

module.exports = router;
