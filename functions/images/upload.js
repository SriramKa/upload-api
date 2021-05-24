const Image = require('../../models/image');
const User = require('../../models/user');
const path = require('path');
const fs = require('fs');

module.exports = (author, filename, mimetype) => new Promise((resolve, reject) => {

	const imageObject = {
		img: {
			data: fs.readFileSync(path.join(__dirname+'/uploads/'+filename)),
			contentType: mimetype
		},
		author: author
	}

	Image.create(imageObject)
	.then((img) => User.findByIdAndUpdate(author, {$push: {images: img._id}}))
	.then((user) => resolve('successful upload'))
	.catch((err) => err);

})