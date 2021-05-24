const express = require('express');
const multer = require('multer');
const uploadFunction = require('../../functions/images/upload');
const isLoggedIn = require('../../middleware/auth');

//setting up multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, 'image')
    }
});
const upload = multer({storage: storage});

const router = express.Router();

router.post('/', isLoggedIn, upload.single('image'), (req, res, next) => {
	const file = req.file;
	if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
		res.end('file type not supported, upload a jpeg or png');
	}
	else if (file.size > 500000) {
		res.end('file too large, it should be <=500kb');
	}
	else{
		uploadFunction(req.user.id, file.filename, file.mimetype)
		.then((result) => res.end(result))
		.catch((err) => res.end(err));
	}
})

module.exports = router
