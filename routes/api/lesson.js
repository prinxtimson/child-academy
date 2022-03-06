const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Controllers
const {
	getAllLesson,
	getLessonById,
	requestLesson,
	updateLesson,
	putLessonLink,
	changeLessonDate,
	acceptLesson,
	deleteLesson,
	declineLesson,
	cancelLesson,
} = require('../../controllers/lessonController');

// middlewares
const auth = require('../../middleware/auth');
const checkIfTutor = require('../../middleware/checkIfTutor');
const checkObjectId = require('../../middleware/checkObjectId');

// @route GET api/lesson/
// @desc get all lesson belonging to authenticated user
router.get('/', auth, getAllLesson);

// @route GET api/lesson/:id
// @desc get lesson by user id
router.get('/:id', [auth, checkObjectId('id')], getLessonById);

// @route POST api/lesson/
// @desc send lesson request
router.post(
	'/',
	[
		auth,
		[
			check('tutor', 'Tutor Id is required'),
			check('subject', 'Subject is required'),
			check('level', 'Level is required'),
		],
	],
	requestLesson
);

// @route PUT api/lesson/:id
// @desc update lesson
router.put('/:id', [auth, checkObjectId('id')], updateLesson);

// @route PUT api/lesson/meeting/:id
// @desc update lesson meeting link
router.put(
	'/meeting/:id',
	[
		auth,
		checkObjectId('id'),
		checkIfTutor,
		[check('link', 'Link is required')],
	],
	putLessonLink
);

// @route PUT api/lesson/date/:id
// @desc update lesson date
router.put(
	'/date/:id',
	[auth, checkObjectId('id'), [check('link', 'Link is required')]],
	changeLessonDate
);

// @route GET api/lesson/accept/:id
// @desc accept lesson request
router.get('/accept/:id', [auth, checkObjectId('id')], acceptLesson);

// @route GET api/lesson/decline/:id
// @desc decline lesson request
router.get('/decline/:id', [auth, checkObjectId('id')], declineLesson);

// @route GET api/lesson/cancel/:id
// @desc cancel lesson request
router.get('/cancel/:id', [auth, checkObjectId('id')], cancelLesson);

// @route DELETE api/lesson/:id
// @desc delete lesson request
router.delete('/:id', [auth, checkObjectId('id')], deleteLesson);

module.exports = router;
