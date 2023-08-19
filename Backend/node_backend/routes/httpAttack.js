const express = require('express');
const httpAttackController = require('../controllers/httpController');
const router = express.Router();


router.get('/', httpAttackController);

module.exports = router;
