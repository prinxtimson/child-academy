const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

//get user controllers
const {
	getUsers,
	addUser,
	becomeTutor,
	uploadAvatar,
} = require('../../controllers/userController');

// middlewares
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');

// @route GET api/users
// @desc get all users
router.get('/', getUsers);

// @route POST api/users
// @desc register user
router.post(
	'/',
	[
		check('firstname', 'Firstname is required').not().isEmpty(),
		check('lastname', 'Lastname is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 8 }),
	],
	addUser
);

// @route POST api/users/upload
// @desc upload user avatar
router.post('/upload', [auth, upload.single('avatar')], uploadAvatar);

// @route GET api/users/become-a-tutor
// @desc become a tutor
router.put(
	'/become-a-tutor',
	[
		auth,
		[
			check('isAdult', 'isAdult is required').not().isEmpty(),
			check('speakEnglish', 'speakEnglish is required').not().isEmpty(),
			check('subjects', 'subjects is required').not().isEmpty(),
			check('levels', 'levels is required').not().isEmpty(),
			check('bio', 'bio is required').not().isEmpty(),
			check('addressLine1', 'addressLine1 is required').not().isEmpty(),
			check('city', 'city is required').not().isEmpty(),
			check('county', 'county is required').not().isEmpty(),
			check('country', 'country is required').not().isEmpty(),
			check('postcode', 'postcode is required').not().isEmpty(),
			check('emergencyName', 'emergencyName is required').not().isEmpty(),
			check('emergencyNumber', 'emergencyNumber is required').not().isEmpty(),
		],
	],
	becomeTutor
);

module.exports = router;
