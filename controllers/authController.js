const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validationResult } = require('express-validator');

// Model
const User = require('../models/User');
const Profile = require('../models/Profile');

// Utilities
const transporter = require('../utils/transporter');

// @desc Get authenticated user controller
exports.getUser = async (req, res, next) => {
	try {
		// get current user
		const user = await User.findById(req.user.id).select('-password');

		// return user
		res.json(user);
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// @desc Login controller
exports.loginUser = async (req, res, next) => {
	const errors = validationResult(req);

	// Check for errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		// find user with email
		let user = await User.findOne({ email });

		// check if user exist
		if (!user) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Invalid Credentials',
					},
				],
			});
		}

		// Match user password
		const isMatch = await bcrypt.compare(password, user.password);

		// check if password is matched
		if (!isMatch) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Invalid Credentials',
					},
				],
			});
		}

		// Return json web token
		const payload = {
			user: {
				id: user.id,
			},
		};

		// Sign json web token with user id
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

// @desc change password controller
exports.changePassword = async (req, res, next) => {
	const errors = validationResult(req);

	// Check for errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { password, newPassword } = req.body;

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

		// Match user password
		const isMatch = await bcrypt.compare(password, user.password);

		// check if password is matched
		if (!isMatch) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Incorrect password',
					},
				],
			});
		}

		// Encrypt password
		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(newPassword, salt);

		// Save user
		await user.save();

		res.json({ msg: 'Password change successfuly' });
	} catch (error) {
		console.error(error.message);

		res.status(500).send('Server error');
	}
};

// @desc request reset password controller
exports.requestPasswordReset = async (req, res) => {
	const errors = validationResult(req);

	// Check for errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email } = req.body;

	try {
		// find user
		const user = await User.findOne({ email });
		const profile = await Profile.findOne({ user: user._id });

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

		const token = await crypto.randomBytes(20).toString('hex');

		const userFields = {
			resetPasswordToken: token,
			resetPasswordExpires: Date.now() + 3600000,
		};

		const payload = await User.findOneAndUpdate(
			{ _id: user.id },
			{ $set: userFields },
			{ new: true }
		);

		const link = `http://localhost:3000/reset-password/${payload.resetPasswordToken}`;

		// create mail option object
		const mailOption = {
			from: 'info@childacademy.com',
			to: email,
			subject: 'Password Change Request',
			html: `<h6>${profile.firstname},</h6>
			<p>Click <a href=${link}>here</a> to change your login password.</p>`,
		};

		// send email
		transporter.sendMail(mailOption, (error, info) => {
			if (error) {
				console.log(error);

				return res.json({ msg: 'Email could not be sent' });
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

		res.json({
			msg: 'Email sent successfully, check you email for further instruction.',
		});
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
};

// @desc reset password controller
exports.resetPassword = async (req, res) => {
	const errors = validationResult(req);

	// Check for errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { password, token } = req.body;

	try {
		// get user
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: { $gt: Date.now() },
		});
		const profile = await Profile.findOne({ user: user._id });

		// Check if user found
		if (!user) {
			return res.status(400).json({
				errors: [{ msg: 'Password reset token is invalid or has expired' }],
			});
		}

		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;

		const salt = await bcrypt.genSalt(16);

		user.password = await bcrypt.hash(password, salt);
		// save user
		await user.save();

		// create mail option object
		const mailOption = {
			to: user.email,
			from: 'info@childacademy.com',
			subject: 'Your password has been changed',
			html: `<h6>Hi ${profile.firstname},</h6> \n 
					<p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>\n`,
		};

		// send email
		transporter.sendMail(mailOption, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

		res.json({ msg: 'Password updated successfully' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
};
