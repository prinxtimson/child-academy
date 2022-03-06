const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		bio: {
			type: String,
		},
		location: {
			type: String,
		},
		phone: {
			type: String,
		},
		gender: {
			type: String,
		},
		levels: {
			type: [String],
		},
		available: {
			type: [String],
		},
		speakEnglish: {
			type: Boolean,
			default: false,
		},
		isAdult: {
			type: Boolean,
			default: false,
		},
		ukResident: {
			type: Boolean,
			default: false,
		},
		status: {
			type: String,
		},
		subjects: {
			type: [String],
		},
		skills: {
			type: [String],
		},
		address: {
			addressLine1: {
				type: String,
			},
			addressLine2: {
				type: String,
			},
			city: {
				type: String,
			},
			county: {
				type: String,
			},
			country: {
				type: String,
			},
			postcode: {
				type: String,
			},
			emergencyName: {
				type: String,
			},
			emergencyNumber: {
				type: String,
			},
		},
		experience: [
			{
				title: {
					type: String,
					required: true,
				},
				company: {
					type: String,
					required: true,
				},
				location: {
					type: String,
				},
				from: {
					type: Date,
					required: true,
				},
				to: {
					type: Date,
				},
				current: {
					type: Boolean,
					default: false,
				},
				description: {
					type: String,
				},
			},
		],
		education: [
			{
				school: {
					type: String,
					required: true,
				},
				degree: {
					type: String,
					required: true,
				},
				fieldOfStudy: {
					type: String,
					required: true,
				},
				from: {
					type: Date,
					required: true,
				},
				to: {
					type: Date,
				},
				current: {
					type: Boolean,
					default: false,
				},
				description: {
					type: String,
				},
			},
		],
		socialMedia: {
			twitter: {
				type: String,
			},
			facebook: {
				type: String,
			},
			linkedin: {
				type: String,
			},
			youtube: {
				type: String,
			},
			instagram: {
				type: String,
			},
		},
	},
	{ timestamps: true }
);

module.exports = Profile = mongoose.model('profile', ProfileSchema);
