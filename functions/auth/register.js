const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = (username, password) => new Promise((resolve, reject) => {

	//finding if user with same username exists or not
	User.findOne({username})
	.then((user) => {
		if(user) reject('User with same username already exists');
		else return bcrypt.genSalt(10);
	})

	//hashing the password
	.then((salt) => (salt) ? bcrypt.hash(password, salt) : reject('error in salt generation'))

	//creating and saving new user
	.then((hash) => (hash) ? User.create({
		username: username,
		password: hash
	}) : reject('error in password generation'))

	//creating JWT
	.then((user) => {
		if(user) {
			const token = jwt.sign({
				id: user._id
			}, process.env.JWT_SECRET, {
				expiresIn: 365 * 24 * 60 * 60
			});
			resolve(token);
		}
		else reject('error in user insertion');
	})

	.catch((err) => reject(err));

})