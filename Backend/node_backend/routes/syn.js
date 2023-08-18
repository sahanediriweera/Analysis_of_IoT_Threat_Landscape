const express = require('express');
const synAttackController = require('../controllers/synController');
const router = express.Router();


router.get('/', synAttackController);

module.exports = router;
