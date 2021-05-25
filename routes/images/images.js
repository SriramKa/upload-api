const express = require('express');
const router = express.Router();

const listRoute = require('./list');
const uploadRoute = require('./upload');
const downloadRoute = require('./download')
router.use('/', listRoute);
router.use('/upload', uploadRoute);
router.use('/download', downloadRoute);

module.exports = router;