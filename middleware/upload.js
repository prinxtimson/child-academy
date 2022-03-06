const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

//Set multer storage Engine
const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function (req, file, cb) {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(cb(err));
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);

				resolve(cb(null, filename));
			});
		});
	},
});

//Init upload and export multer middleware
module.exports = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const fileTypes = /jpg|jpeg|png|gif/;

		//check file extension
		const extname = fileTypes.test(
			path.extname(file.originalname).toLowerCase()
		);

		//check file mimetype
		const mimetype = fileTypes.test(file.mimetype);

		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb('Error: file type not allowed!');
		}
	},
});
