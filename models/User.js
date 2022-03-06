const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'name is required'],
		},
		email: {
			type: String,
			required: [true, 'email is required'],
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'password is required'],
		},
		avatar: {
			type: String,
		},
		isTutor: {
			type: Boolean,
			default: false,
		},
		resetPasswordToken: {
			type: String,
			required: false,
		},
		resetPasswordExpires: {
			type: Date,
			required: false,
		},
	},
	{ timestamps: true }
);

module.exports = User = mongoose.model('user', UserSchema);
