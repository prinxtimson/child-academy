const jwt = require('jsonwebtoken');

// authenticate user middleware
module.exports = (req, res, next) => {
	// Get token from header
	const token = req.header('x-auth-token');

	//Check if token not found
	if (!token) {
		return res.status(401).json({
			errors: [
				{
					msg: 'Token not found, authorization denied',
				},
			],
		});
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWTSECRET);

		req.user = decoded.user;

		next();
	} catch (error) {
		res.status(401).json({
			errors: [
				{
					msg: 'Token not valid',
				},
			],
		});
	}
};
