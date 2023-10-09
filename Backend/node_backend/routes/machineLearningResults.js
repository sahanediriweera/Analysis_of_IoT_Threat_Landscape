const express = require('express');
const httpAttackController = require('../controllers/machineLearnigResultsController');
const router = express.Router();


router.get('/', httpAttackController);

module.exports = router;
