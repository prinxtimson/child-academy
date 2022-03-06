const { validationResult } = require('express-validator');

// Model
const Lesson = require('../models/Lesson');
const User = require('../models/User');
const Notification = require('../models/Notification');

// controller to get all the lesson attached to authenticated user
exports.getAllLesson = async (req, res) => {
	try {
		// get all lesson and populate with user name and avatar and tutor name and avatar
		const lessons = await Lesson.find({
			$or: [{ user: req.user.id }, { tutor: req.user.id }],
		})
			.populate('user', ['name', 'avatar'])
			.populate('tutor', ['name', 'avatar']);

		// return lessons
		res.json(lessons);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// controller to get lesson by id
exports.getLessonById = async (req, res) => {
	try {
		// get all lesson and populate with user name and avatar and tutor name and avatar
		const lessons = await Lesson.findById(req.params.id)
			.populate('user', ['name', 'avatar'])
			.populate('tutor', ['name', 'avatar']);

		// return lessons
		res.json(lessons);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// controller to request lesson
exports.requestLesson = async (req, res) => {
	const errors = validationResult(req);

	// Check for errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const {
		tutor,
		subject,
		level,
		introduction,
		studentName,
		date,
		time,
		phone,
		email,
	} = req.body;

	try {
		// Get tutor
		const user = await User.findById(tutor);

		// Check if tutor is found.
		if (!user) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Tutor not found',
					},
				],
			});
		}

		// Build lesson object
		const lessonFields = {
			user: req.user.id,
			tutor: user.id,
			subject,
			level,
		};

		if (introduction) lessonFields.introduction = introduction;

		if (studentName) lessonFields.studentName = studentName;

		if (date) lessonFields.date = date;

		if (time) lessonFields.time = time;

		// Build contact object
		lessonFields.contact = {};

		if (phone) lessonFields.contact.phone = phone;

		if (email) lessonFields.contact.email = email;

		// Create lesson instance
		let lesson = new Lesson(lessonFields);

		// Save lesson instance
		await lesson.save();

		lesson = await Lesson.findById(lesson._id).populate('user', [
			'name',
			'avatar',
		]);

		//Prepare Notification instance
		let notification = new Notification({
			user: user.id,
			from: req.user.id,
			type: 'LessonRequest',
			title: 'Lesson Request',
			model: {
				ref: 'lesson',
				id: lesson.id,
			},
			data: {
				student: lesson.studentName,
				subject: lesson.subject,
				level: lesson.level,
			},
		});

		// Save notication instance
		await notification.save();

		notification = await Notification.findById(notification._id).populate(
			'from',
			'name avatar'
		);

		// send notification to user
		req.io.in(notification.user.toString()).emit('notification', notification);

		// return lesson
		res.json(lesson);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// Controller to update lesson
exports.updateLesson = async (req, res) => {
	const { subject, level, introduction, studentName, phone, email } = req.body;

	try {
		// Build lesson object
		const lessonFields = {};

		if (subject) lessonFields.subject = subject;

		if (level) lessonFields.level = level;

		if (introduction) lessonFields.introduction = introduction;

		if (studentName) lessonFields.studentName = studentName;

		// Build contact object
		lessonFields.contact = {};

		if (phone) lessonFields.contact.phone = phone;

		if (email) lessonFields.contact.email = email;

		// get lesson
		let lesson = await Lesson.findOne({
			_id: req.params.id,
			user: req.user.id,
		});

		// Check if lesson is found
		if (!lesson) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Lesson not found',
					},
				],
			});
		}

		// Find and update lesson
		lesson = await Lesson.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: lessonFields },
			{ new: true }
		)
			.populate('user', ['name', 'avatar'])
			.populate('tutor', ['name', 'avatar']);

		// return lesson
		res.json(lesson);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// change lesson dates
exports.changeLessonDate = async (req, res) => {
	const errors = validationResult(req);

	// Check for errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { date } = req.body;

		// get lesson
		let lesson = await Lesson.findOne({
			$or: [
				{ _id: req.params.id, user: req.user.id },
				{ _id: req.params.id, tutor: req.user.id },
			],
		});

		// Check if lesson is found
		if (!lesson) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Lesson not found',
					},
				],
			});
		}

		// Find and update lesson
		lesson = await Lesson.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { date } },
			{ new: true }
		)
			.populate('user', ['name', 'avatar'])
			.populate('tutor', ['name', 'avatar']);

		//Prepare Notification instance
		let notification = new Notification({
			user: lesson.user.id,
			from: req.user.id,
			type: 'LessonDateChenge',
			title: 'Date Change',
			model: {
				ref: 'lesson',
				id: lesson.id,
			},
			data: {
				date: lesson.date,
				time: lesson.time,
			},
		});

		// Save notication instance
		await notification.save();

		notification = await Notification.findById(notification._id).populate(
			'from',
			'name avatar'
		);

		// send notification to user
		req.io.in(notification.user.toString()).emit('notification', notification);

		// return lesson
		res.json(lesson);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// controller to update lesson link
exports.putLessonLink = async (req, res) => {
	const errors = validationResult(req);

	// Check for errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { link } = req.body;

		// get lesson
		let lesson = await Lesson.findOne({
			_id: req.params.id,
			tutor: req.user.id,
		});

		// Check if lesson is found
		if (!lesson) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Lesson not found',
					},
				],
			});
		}

		// Find and update lesson
		lesson = await Lesson.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { link } },
			{ new: true }
		)
			.populate('user', ['name', 'avatar'])
			.populate('tutor', ['name', 'avatar']);

		// return lesson
		res.json(lesson);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

//Controller to accept lesson
exports.acceptLesson = async (req, res) => {
	try {
		// Get lesson
		let lesson = await Lesson.findOne({
			_id: req.params.id,
			tutor: req.user.id,
		});

		// Check if lesson is found.
		if (!lesson) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Lesson not found',
					},
				],
			});
		}

		// Find and update lesson
		lesson = await Lesson.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { acceptedAt: Date(), declinedAt: null } },
			{ new: true }
		)
			.populate('user', ['name', 'avatar'])
			.populate('tutor', ['name', 'avatar']);

		//Prepare Notification instance
		let notification = new Notification({
			user: lesson.user.id,
			from: req.user.id,
			type: 'LessonRequestAccepted',
			title: 'Request Accepted',
			model: {
				ref: 'lesson',
				id: lesson.id,
			},
			data: {
				student: lesson.studentName,
				subject: lesson.subject,
				level: lesson.level,
			},
		});

		// Save notication instance
		await notification.save();

		notification = await Notification.findById(notification._id).populate(
			'from',
			'name avatar'
		);

		// send notification to user
		req.io.in(notification.user.toString()).emit('notification', notification);

		// return lesson
		res.json(lesson);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// Controller to decline lesson
exports.declineLesson = async (req, res) => {
	try {
		// Get lesson
		let lesson = await Lesson.findOne({
			_id: req.params.id,
			tutor: req.user.id,
		});

		// Check if lesson is found.
		if (!lesson) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Lesson not found',
					},
				],
			});
		}

		// Find and update lesson
		lesson = await Lesson.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { acceptedAt: null, declinedAt: Date() } },
			{ new: true }
		)
			.populate('user', ['name', 'avatar'])
			.populate('tutor', ['name', 'avatar']);

		//Prepare Notification instance
		let notification = new Notification({
			user: lesson.user.id,
			from: req.user.id,
			type: 'LessonRequestDeclined',
			title: 'Request Decline',
			model: {
				ref: 'lesson',
				id: lesson.id,
			},
			data: {
				student: lesson.studentName,
				subject: lesson.subject,
				level: lesson.level,
			},
		});

		// Save notication instance
		await notification.save();

		notification = await Notification.findById(notification._id).populate(
			'from',
			'name avatar'
		);

		// send notification to user
		req.io.in(notification.user.toString()).emit('notification', notification);

		// return lesson
		res.json(lesson);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// Controller to cancel lesson
exports.cancelLesson = async (req, res) => {
	try {
		// Get lesson
		let lesson = await Lesson.findOne({
			_id: req.params.id,
			user: req.user.id,
		});

		// Check if lesson is found.
		if (!lesson) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Lesson not found',
					},
				],
			});
		}

		// Find and update lesson
		lesson = await Lesson.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { canceledAt: new Date() } },
			{ new: true }
		)
			.populate('user', ['name', 'avatar'])
			.populate('tutor', ['name', 'avatar']);

		//Prepare Notification instance
		let notification = new Notification({
			user: lesson.tutor.id,
			from: req.user.id,
			type: 'LessonRequestCancel',
			title: 'Request Cancel',
			model: {
				ref: 'lesson',
				id: lesson.id,
			},
			data: {
				student: lesson.studentName,
				subject: lesson.subject,
				level: lesson.level,
			},
		});

		// Save notication instance
		await notification.save();

		notification = await Notification.findById(notification._id).populate(
			'from',
			'name avatar'
		);

		// send notification to user
		req.io.in(notification.user.toString()).emit('notification', notification);

		// return lesson
		res.json(lesson);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// controller to delete lesson
exports.deleteLesson = async (req, res) => {
	try {
		// Remove lesson
		await Lesson.findOneAndRemove({ user: req.user.id, _id: req.params.id });

		res.json({ msg: 'Lesson deleted' });
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};
