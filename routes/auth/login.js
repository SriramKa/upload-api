const express = require('express');
const loginFunction = require('../../functions/auth/login');

const router = express.Router();

router.post('/', (req, res, next) => {
	loginFunction(req.body.username, req.body.password)
	.then((token) => {
		if (token) {
			res.locals.username = req.body.username;
			res.cookie('jwt', token, {
				httpOnly: true,
				maxAge: 365 * 24 * 60 * 60
			}).end('you are logged in as '+ req.body.username);
		}
		else res.end('jwt generation error');
	})
	.catch((err) => res.end(err));
});

module.exports = router;