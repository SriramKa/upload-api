const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	images: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'image'
	}]
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;