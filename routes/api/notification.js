const express = require('express');
const router = express.Router();

// controllers
const {
	markNotification,
	getNotifications,
} = require('../../controllers/notificationController');

// middlewares
const auth = require('../../middleware/auth');

// @route GET api/notifications/
// @desc get all user notifications
router.get('/', auth, getNotifications);

// @route PUT api/notifications/
// @desc mark unread notifications
router.put('/', auth, markNotification);

module.exports = router;
