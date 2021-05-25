const express = require('express');
const fs = require('fs');
const isLoggedIn = require('../../middleware/auth');
const downloadFunction = require('../../functions/images/download');
const router = express.Router();

router.get('/:imgId', isLoggedIn, (req, res, next) => {

	downloadFunction(req.user.id, req.params.imgId)
	.then((imageContent) => {
		res.contentType(imageContent.mimetype);
		res.send(imageContent.imageBuffer);
	})
	.catch((err) => res.end(JSON.stringify(err)));

})

module.exports = router;