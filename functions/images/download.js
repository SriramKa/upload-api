const Image = require('../../models/image');
const mongoose = require('mongoose');

module.exports = (userId, imgId) => new Promise((resolve, reject) => {

	Image.findById(mongoose.Types.ObjectId(imgId))
	.then((image) => {
		if(image.author.toString() === userId.toString()) {
			imageBuffer = Buffer.from(image.data, 'base64');
			resolve({
				imageBuffer: imageBuffer,
				mimetype: image.contentType
			});
		}
		else reject('user not authenticated to access this image');
	});

});