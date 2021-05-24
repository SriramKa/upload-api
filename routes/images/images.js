const express = require('express');
const router = express.Router();

const uploadRoute = require('./upload');
router.use('/upload', uploadRoute);

module.exports = router;