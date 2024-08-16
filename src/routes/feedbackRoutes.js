const express = require('express');
// Controller
const feedbackController = require('../controllers/feedbackController');
// Middleware
const {validateFeedback} = require('../middleware/validateFeedback');

const router = express.Router();

router.post('/', validateFeedback, feedbackController.createFeedback);
router.get('/', feedbackController.getAllFeedback);

module.exports = router;