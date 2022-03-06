const mongoose = require('mongoose');

// Check if id is a valid mongodb id middleware
module.exports = idToCheck => (req, res, next) => {
	// check if id params from request is a valid mongodb id
	if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck])) {
		return res.status(400).json({
			errors: [
				{
					msg: 'Invalid ID',
				},
			],
		});
	}

	next();
};
