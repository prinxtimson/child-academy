const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		from: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		type: {
			type: String,
		},
		title: {
			type: String,
		},
		model: {
			ref: {
				type: String,
			},
			id: {
				type: mongoose.Schema.Types.ObjectId,
			},
		},
		data: {
			type: Map,
			of: String,
		},
		readAt: {
			type: Date,
		},
	},
	{ timestamps: true }
);

module.exports = Notification = mongoose.model(
	'notification',
	NotificationSchema
);
