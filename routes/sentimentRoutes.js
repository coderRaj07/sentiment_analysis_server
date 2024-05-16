const express = require('express');
const router = express.Router();
const sentimentController = require('../controllers/sentimentController');

router.post('/analyze', sentimentController.analyzeSentiment);

module.exports = router;
