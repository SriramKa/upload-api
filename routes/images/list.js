const express = require('express');
const isLoggedIn = require('../../middleware/auth');
const listImages = require('../../functions/images/list')
const router = express.Router();

router.get('/', isLoggedIn, (req, res, next) => {

	listImages(req.user.id)
	.then((images) => res.json(images))
	.catch((err) => res.end(JSON.stringify(err)));

})

module.exports = router;