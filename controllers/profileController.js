const { validationResult } = require('express-validator');

// Models
const Profile = require('../models/Profile');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Notification = require('../models/Notification');

// Utilities
const { capitalizeFirstLetter } = require('../utils/utils');

// Get current user profile controller
exports.getProfile = async (req, res, next) => {
	try {
		//Get user profile
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name', 'avatar']
		);

		// check if no profile is found
		if (!profile) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Profile not found',
					},
				],
			});
		}

		// Get all users notifications
		const notifications = await Notification.find({ user: req.user.id });

		// Get all users Lesson
		const lessons = await Lesson.find({
			$or: [{ user: req.user.id }, { tutor: req.user.id }],
		});

		profile.notifications = notifications;

		profile.lessons = lessons;

		// return profile
		res.json(profile);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// Update profile controller
exports.updateProfile = async (req, res, next) => {
	const errors = validationResult(req);

	// Check for errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const {
		firstname,
		lastname,
		bio,
		gender,
		phone,
		location,
		subjects,
		skills,
		levels,
		twitter,
		instagram,
		facebook,
		linkedin,
	} = req.body;

	try {
		// Build profile object
		const profileFields = {};

		profileFields.user = req.user.id;

		if (firstname) profileFields.firstname = capitalizeFirstLetter(firstname);

		if (lastname) profileFields.lastname = capitalizeFirstLetter(lastname);

		if (bio) profileFields.bio = bio;

		if (location) profileFields.location = location;

		if (gender) profileFields.gender = gender;

		if (phone) profileFields.phone = phone;

		if (subjects) {
			profileFields.subjects = subjects
				.split(',')
				.map(subject => subject.trim());
		}

		if (levels) {
			profileFields.levels = levels.split(',').map(level => level.trim());
		}

		if (skills) {
			profileFields.skills = skills.split(',').map(skill => skill.trim());
		}

		// Build social object
		profileFields.socialMedia = {};

		if (twitter) profileFields.socialMedia.twitter = twitter;

		if (facebook) profileFields.socialMedia.facebook = facebook;

		if (linkedin) profileFields.socialMedia.linkedin = linkedin;

		if (instagram) profileFields.socialMedia.instagram = instagram;

		// get profile
		let profile = await Profile.findOne({ user: req.user.id });

		// Check if profile is found
		if (!profile) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Profile not found',
					},
				],
			});
		}

		// Find and update profile
		profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: profileFields },
			{ new: true }
		);

		// Check if firstname or lastname field is included in the request body
		// upate user model firstname or lastname
		if (firstname || lastname) {
			await User.findByIdAndUpdate(req.user.id, {
				name: `${profile.firstname} ${profile.lastname}`,
			});
		}

		// return profile
		return res.json(profile);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// Get all profiles controller
exports.getAllProfile = async (req, res, next) => {
	try {
		// get all profile and populate with user name and avatar
		const profiles = await Profile.find().populate(
			'user',
			'name avatar isTutor'
		);

		// return profiles
		res.json(profiles);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

exports.getProfileById = async (req, res, next) => {
	try {
		// get user profile by user id and populate it with user name and avatar
		const profile = await Profile.findOne({ user: req.params.id })
			.populate('user', ['name', 'avatar'])
			.exec();

		// check if no profile is found
		if (!profile) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Profile not found',
					},
				],
			});
		}

		//send profile
		res.json(profile);
	} catch (error) {
		console.error(error.message);

		// check if error is type Objectid
		if (error.kind == 'ObjectId') {
			return res.status(400).json({
				errors: [
					{
						msg: 'Profile not found',
					},
				],
			});
		}

		res.status(500).send('Server error');
	}
};

// Delete profile controller
exports.deleteUser = async (req, res, next) => {
	try {
		// Remove profile
		await Profile.findOneAndRemove({ user: req.user.id });

		// Remove user
		await User.findOneAndRemove({ id: req.user.id });

		res.json({ msg: 'User deleted' });
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// add experience controller
exports.addExperience = async (req, res) => {
	const errors = validationResult(req);

	// Check for errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { title, company, location, from, to, current, description } = req.body;

	// create new experience object
	const newExperience = {
		title,
		company,
		location,
		from,
		to,
		current,
		description,
	};

	try {
		// Get current user profile
		const profile = await Profile.findOne({ user: req.user.id });

		// add profile to the start of the experience array
		profile.experience.unshift(newExperience);

		// save profile
		await profile.save();

		//send profile
		res.json(profile);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// edit experience controller
exports.editExperience = async (req, res) => {
	const { title, company, location, from, to, current, description } = req.body;

	try {
		// Get current user profile
		const profile = await Profile.findOne({ user: req.user.id });

		// Get experience by id
		const experience = profile.experience.filter(
			item => item.id === req.params.id
		)[0];

		if (title) experience.title = title;
		if (company) experience.company = company;
		if (location) experience.location = location;
		if (from) experience.from = from;
		if (to) experience.to = to;
		if (current) experience.current = current;
		if (description) experience.description = description;

		// Get index of experience to remove
		const index = profile.experience.findIndex(
			item => item._id === req.params.id
		);

		// Remove experience with return index from profile
		profile.experience.splice(index, 1, experience);

		// save profile
		await profile.save();

		//send profile
		res.json(profile);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// Delete experience from user profile
exports.deleteExperience = async (req, res) => {
	try {
		// Get current user profile
		const profile = await Profile.findOne({ user: req.user.id });

		// Get index of experience to remove
		const index = profile.experience.findIndex(exp => exp.id === req.params.id);

		// Remove experience with return index from profile
		profile.experience.splice(index, 1);

		// Save profile
		await profile.save();

		// send profile
		res.json(profile);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// add eduction controller
exports.addEducation = async (req, res) => {
	const errors = validationResult(req);

	// Check for errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { school, degree, fieldOfStudy, from, to, current, description } =
		req.body;

	const newEducation = {
		school,
		degree,
		fieldOfStudy,
		from,
		to,
		current,
		description,
	};

	try {
		// Get current user profile
		const profile = await Profile.findOne({ user: req.user.id });

		// add profile to the start of the education array
		profile.education.unshift(newEducation);

		// save profile
		await profile.save();

		//send profile
		res.json(profile);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// edit eduction controller
exports.editEducation = async (req, res) => {
	const { school, degree, fieldOfStudy, from, to, current, description } =
		req.body;

	try {
		// Get current user profile
		const profile = await Profile.findOne({ user: req.user.id });

		// Get education by id
		const education = profile.education.filter(
			item => item.id === req.params.id
		)[0];

		if (school) education.school = school;
		if (degree) education.degree = degree;
		if (fieldOfStudy) education.fieldOfStudy = fieldOfStudy;
		if (from) education.from = from;
		if (to) education.to = to;
		if (current) education.current = current;
		if (description) education.description = description;

		// Get index of education to remove
		const index = profile.education.findIndex(
			item => item.id === req.params.id
		);

		// Remove education with return index from profile
		profile.education.splice(index, 1, education);

		// save profile
		await profile.save();

		//send profile
		res.json(profile);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// Delete education from user profile
exports.deleteEducation = async (req, res) => {
	try {
		// Get current user profile
		const profile = await Profile.findOne({ user: req.user.id });

		// Get index of education to remove
		const index = profile.education.findIndex(edu => edu.id === req.params.id);

		// Remove education with return index from profile
		profile.education.splice(index, 1);

		// Save profile
		await profile.save();

		// send profile
		res.json(profile);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};
