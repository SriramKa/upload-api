const mongoose = require ('mongoose');

const imageSchema = new mongoose.Schema({
	img: {
		data: Buffer,
		contentType: String
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	}
});

const imageModel = mongoose.model('image', imageSchema);

module.exports = imageModel;