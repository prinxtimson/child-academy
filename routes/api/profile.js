const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

// controllers
const {
	getProfile,
	getAllProfile,
	getProfileById,
	updateProfile,
	deleteUser,
	addExperience,
	deleteExperience,
	deleteEducation,
	addEducation,
	editExperience,
	editEducation,
} = require('../../controllers/profileController');

// middlewares
const auth = require('../../middleware/auth');
const checkIfTutor = require('../../middleware/checkIfTutor');
const checkObjectId = require('../../middleware/checkObjectId');

// @route GET api/profile/me
// @desc get current users profile
router.get('/me', auth, getProfile);

// @route GET api/profile/
// @desc get all profile
router.get('/', getAllProfile);

// @route GET api/profile/
// @desc get profile by user id
router.get('/user/:id', checkObjectId('id'), getProfileById);

// @route POST api/profile/
// @desc update user
router.post('/', auth, updateProfile);

// @route PUT api/profile/experience
// @desc add user profile experience
router.put(
	'/experience',
	[
		auth,
		checkIfTutor,
		[
			check('title', 'title is required').not().isEmpty(),
			check('company', 'company is required').not().isEmpty(),
			check('from', 'from date is required').not().isEmpty(),
		],
	],
	addExperience
);

// @route PUT api/profile/experience/:id
// @desc edit user profile experience
router.put(
	'/experience/:id',
	[auth, checkIfTutor, checkObjectId('id')],
	editExperience
);

// @route PUT api/profile/education
// @desc add user profile education
router.put(
	'/education',
	[
		auth,
		checkIfTutor,
		[
			check('school', 'school is required').not().isEmpty(),
			check('degree', 'degree is required').not().isEmpty(),
			check('fieldOfStudy', 'fieldOfStudy is required').not().isEmpty(),
			check('from', 'from date is required').not().isEmpty(),
		],
	],
	addEducation
);

// @route PUT api/profile/education/:id
// @desc edit user profile education
router.put(
	'/education/:id',
	[auth, checkIfTutor, checkObjectId('id')],
	editEducation
);

// @route DELETE api/profile/
// @desc delete profile and user
router.delete('/:id', [auth, checkObjectId('id')], deleteUser);

// @route DELETE api/profile/experience/:id
// @desc delete experience profile
router.delete(
	'/experience/:id',
	[auth, checkIfTutor, checkObjectId('id')],
	deleteExperience
);

// @route DELETE api/profile/education/:id
// @desc delete education profile
router.delete(
	'/education/:id',
	[auth, checkIfTutor, checkObjectId('id')],
	deleteEducation
);

module.exports = router;
