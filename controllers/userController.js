const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Models
const User = require('../models/User');
const Profile = require('../models/Profile');

// Utilities
const { capitalizeFirstLetter } = require('../utils/utils');

// @desc Get all users
// @route /api/users
// @method GET
exports.getUsers = (req, res, next) => {
	res.send('GET users');
};

// @desc Register user
// @route /api/users
// @method POST
exports.addUser = async (req, res, next) => {
	const errors = validationResult(req);

	// Check for errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { firstname, lastname, email, password } = req.body;

	try {
		// Check if user already exists
		let user = await User.findOne({ email });

		// return error if user exist
		if (user) {
			return res.status(400).json({
				errors: [
					{
						msg: 'User already exists',
					},
				],
			});
		}

		// Get user's gravatar
		const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

		// Create instance of user
		user = new User({
			name: `${capitalizeFirstLetter(firstname)} ${capitalizeFirstLetter(
				lastname
			)}`,
			email,
			avatar,
			password,
		});

		// Encrypt password
		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		// Save user
		await user.save();

		// Create new profile instance
		profile = new Profile({
			user: user.id,
			firstname: capitalizeFirstLetter(firstname),
			lastname: capitalizeFirstLetter(lastname),
		});

		// Save profile
		await profile.save();

		// Return json web token
		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(
			payload,
			process.env.JWTSECRET,
			{ expiresIn: 360000 },
			(err, token) => {
				if (err) throw err;

				res.json({ token });
			}
		);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// Become a tutor controller
exports.becomeTutor = async (req, res, next) => {
	const errors = validationResult(req);

	// Check for errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const {
		bio,
		subjects,
		levels,
		isAdult,
		speakEnglish,
		ukResident,
		daysAvailable,
		addressLine1,
		addressLine2,
		city,
		county,
		country,
		postcode,
		emergencyName,
		emergencyNumber,
	} = req.body;

	try {
		// Get user profile
		let profile = await Profile.findOne({ user: req.user.id });

		// return error if profile exist
		if (!profile) {
			return res.status(400).json({
				errors: [
					{
						msg: 'User profile not found',
					},
				],
			});
		}

		// Build profile object
		const profileFields = {
			bio,
			subjects: subjects.split(',').map(subject => subject.trim()),
			levels: levels.split(',').map(level => level.trim()),
			isAdult,
			speakEnglish,
			ukResident,
		};

		if (daysAvailable) profileFields.available = daysAvailable;

		// Build address object
		profileFields.address = {};

		if (addressLine1) profileFields.address.addressLine1 = addressLine1;

		if (addressLine2) profileFields.address.addressLine2 = addressLine2;

		if (city) profileFields.address.city = city;

		if (county) profileFields.address.county = county;

		if (country) profileFields.address.country = country;

		if (postcode) profileFields.address.postcode = postcode;

		if (emergencyName) profileFields.address.emergencyName = emergencyName;

		if (emergencyNumber)
			profileFields.address.emergencyNumber = emergencyNumber;

		// Find and update profile
		profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: profileFields },
			{ new: true }
		);

		// find and update user
		await User.findByIdAndUpdate(req.user.id, {
			isTutor: true,
		});

		res.json({ msg: 'You are now a tutor!' });
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// upload avatar controller
exports.uploadAvatar = async (req, res) => {
	try {
		// get current user
		let user = await User.findById(req.user.id);

		// check if user exist
		if (!user) {
			return res.status(400).json({
				errors: [
					{
						msg: 'User not found',
					},
				],
			});
		}

		//save filename to user details
		user.avatar = `/uploads/${req.file.filename}`;

		//save user
		await user.save();

		return res.json({ msg: 'Avatar upload successful' });
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};
