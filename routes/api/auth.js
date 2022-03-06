const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Middlewares
const auth = require('../../middleware/auth');

//controllers
const {
	getUser,
	loginUser,
	changePassword,
	resetPassword,
	requestPasswordReset,
} = require('../../controllers/authController');

// @desc Get user
// @route /api/auth
// @method GET
router.get('/', auth, getUser);

// @desc Login user
// @route /api/auth
// @method POST
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required.').exists(),
	],
	loginUser
);

// @desc Change user password
// @route /api/auth/change-password
// @method PUT
router.put(
	'/change-password',
	[
		auth,
		[
			check('password', 'Password is required!').exists(),
			check('newPassword', 'New Password is required.').isLength({ min: 8 }),
		],
	],
	changePassword
);

// @desc Reset user password
// @route /api/auth/reset-password
// @method PUT
router.put(
	'/reset-password',
	[
		check('token', 'Token is required!').exists(),
		check('password', 'Password is required.').isLength({ min: 8 }),
	],
	resetPassword
);

// @desc Request password reset
// @route /api/auth/request-password-reset
// @method PUT
router.put(
	'/request-password-reset',
	[check('email', 'Email is required!').exists()],
	requestPasswordReset
);

module.exports = router;
