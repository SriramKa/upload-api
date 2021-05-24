const Image = require('../../models/image');
const User = require('../../models/user');
const path = require('path');
const fs = require('fs');

module.exports = (author, buffer, mimetype) => new Promise((resolve, reject) => {

	const imageObject = {
		img: {
			data: buffer,
			contentType: mimetype
		},
		author: author
	}

	//inserting image into database
	Image.create(imageObject)
	.then((img) => User.findByIdAndUpdate(author, {$push: {images: img._id}}))
	.then((user) => resolve('successful upload'))
	.catch((err) => err);

});