const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const registerFunction = require('../../functions/auth/register');

const router = express.Router();

router.post('/', (req, res, next) => {

	// //checking whether user already exists
	// User.findOne({username: req.body.username})
	// .then((user) => {
	// 	if(user) res.render('register', {
	// 		errorMessage: 'User with same username already exists'
	// 	});
	// 	else return bcrypt.genSalt(10);
	// })

	// //hashing the password
	// .then((salt) => (salt) ? bcrypt.hash(req.body.password, salt) : next())

	// //adding new user to database
	// .then((hash) => (hash) ? User.create({
	// 	name: req.body.name,
	// 	username: req.body.username,
	// 	password: hash
	// }) : next())
	// .then((inserted) => {
	// 	if (inserted) {
	// 		const token = createToken(inserted._id);
	// 		res.locals.name = inserted.name;
	// 		res.cookie('jwt', token, {
	// 			httpOnly: true,
	// 			maxAge: 365 * 24 * 60 * 60
	// 		}).redirect('/events');
	// 	}
	// })
	// .catch((err) => res.render('register', {
	// 	errorMessage: "There was an error in creating your account, please try again."
	// }));

	registerFunction(req.body.username, req.body.password)
	.then((token) => {
		if (token) {
			res.locals.username = req.body.username;
			res.cookie('jwt', token.jwt, {
				httpOnly: true,
				maxAge: 365 * 24 * 60 * 60
			}).end('you are logged in as '+ req.body.username);
		}
		else res.end('jwt generation error');
	})
	.catch((err) => res.end(err));

})

module.exports = router;