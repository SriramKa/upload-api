const User = require('../../models/user');

module.exports = (id) => new Promise((resolve, reject) => {

	User.findById(id, 'images')
	.populate('images', '_id name')
	.then((user) => resolve(user.images))
	.catch((err) => reject(err));

});