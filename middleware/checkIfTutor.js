const User = require('../models/User');

// Check if user is a tutor middleware
module.exports = async (req, res, next) => {
	// Get current user profile
	const user = await User.findById(req.user.id);

	try {
		if (!user.isTutor) {
			return res.status(401).json({
				errors: [
					{
						msg: 'Unauthorized to access this route, become a tutor to access this route',
					},
				],
			});
		}

		next();
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};
