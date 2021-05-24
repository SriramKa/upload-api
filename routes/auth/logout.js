const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.cookie('jwt', '', { maxAge: 1 }).end('You have successfully logged out');
})

module.exports = router;