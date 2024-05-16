const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const auth = require('../middlewares/auth');

router.post('/upload', auth, fileController.uploadFile);
router.get('/:id', auth, fileController.getFile);

module.exports = router;
