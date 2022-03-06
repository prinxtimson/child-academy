const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		tutor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		subject: {
			type: String,
			required: true,
		},
		level: {
			type: String,
			required: true,
		},
		meetingLink: {
			type: String,
		},
		introduction: {
			type: String,
		},
		studentName: {
			type: String,
			default: 'Self',
		},
		format: {
			type: String,
			default: 'online',
		},
		date: {
			type: Date,
		},
		time: {
			type: String,
		},
		declinedAt: {
			type: Date,
		},
		acceptedAt: {
			type: Date,
		},
		canceledAt: {
			type: Date,
		},
		contact: {
			address: {
				type: String,
			},
			phone: {
				type: String,
				required: true,
			},
			email: {
				type: String,
			},
		},
	},
	{ timestamps: true }
);

module.exports = Lesson = mongoose.model('lesson', LessonSchema);
