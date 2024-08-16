const express = require('express');
// Controller
const feedbackController = require('../controllers/feedbackController');
// Middleware
const validateFeedback = require('../middleware/validateFeedback');
const validateFeedbackExists = require('../middleware/validateFeedbackExists');

const router = express.Router();

router.post('/', validateFeedback, feedbackController.createFeedback);
router.get('/', feedbackController.getAllFeedback);
router.get('/:id', feedbackController.getFeedbackById);
router.put('/:id', validateFeedbackExists, feedbackController.updateFeedback);
router.delete('/:id', validateFeedbackExists, feedbackController.deleteFeedback);

module.exports = router;