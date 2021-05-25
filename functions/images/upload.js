const Image = require('../../models/image');
const User = require('../../models/user');

module.exports = (author, imageBuffer, filename, mimetype) => new Promise((resolve, reject) => {

	const imageBase64 = imageBuffer.toString('base64');
	const imageObject = {
		author: author,
		name: filename,
		data: imageBase64,
		contentType: mimetype
	}

	//inserting image into database
	Image.create(imageObject)
	.then((image) => {
		console.log('here')
		return User.findByIdAndUpdate(author, {$push: {images: image._id}})
	})
	.then(() => resolve('successful upload'))
	.catch((err) => reject('uploading failed'));

});