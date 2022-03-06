// Models
const Notification = require('../models/Notification');

// get user notifications controller
exports.getNotifications = async (req, res) => {
	try {
		const notifications = await Notification.find({
			user: req.user.id,
		}).populate('from', 'name avatar');

		res.json(notifications);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// mark user unread notification
exports.markNotification = async (req, res) => {
	try {
		let notifications = await Notification.updateMany(
			{ user: req.user.id, readAt: undefined },
			{
				$set: {
					readAt: new Date(),
				},
			}
		);

		notifications = await Notification.find({ user: req.user.id }).populate(
			'from',
			'name avatar'
		);

		res.json(notifications);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};
