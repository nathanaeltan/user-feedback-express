const express = require('express');
// Controller
const feedbackController = require('../controllers/feedbackController');
// Middleware
const {validateFeedback} = require('../middleware/validateFeedback');

const router = express.Router();

router.post('/', validateFeedback, feedbackController.createFeedback);
router.get('/', feedbackController.getAllFeedback);
router.get('/:id', feedbackController.getFeedbackById);

module.exports = router;