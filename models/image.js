const mongoose = require ('mongoose');

const imageSchema = new mongoose.Schema({
	name: String,
	author: {
		type:mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	data: String,	//base64 encoded string
	contentType: String
});

const imageModel = new mongoose.model('image', imageSchema);

module.exports = imageModel;