const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const maxAge = 365 * 24 * 60* 60; //one year, in seconds
let message = ''

//for login, authentication and token creation is needed
module.exports = (username, password) => new Promise((resolve, reject) => {
	async.waterfall([

		//finding user
		(callback) => {
			User.findOne({username})
			.then((user) => callback(null, user));
		},

		//comparing passwords if user exists
		(user, callback) => {
			if (user) {
				bcrypt.compare(password, user.password)
				.then((result) => callback(null, user, result));
			}
			else {
				message = 'User with this username not found';
				callback(null, null, null);
			}
		},

		//returning jwt in case of successful authentication
		(user, result, callback) => {
			if(result === true) {
				const token = jwt.sign({
					id: user._id
				}, process.env.JWT_SECRET, {
					expiresIn: maxAge
				});
				callback(null, token, user.username);
			}
			else {
				message = (result === false) ? 'Incorrect password' : message;
				callback(null, null, null);
			}
		}
	])
	.then((result) => {
		if (result) resolve(result[0]);	//this is the jwt
		else reject(message);
	});
});