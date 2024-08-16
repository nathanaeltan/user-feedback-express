const feedbackService = require('../services/feedbackService');

const createFeedback = async (req, res) => {
    try {
        const { feedback, product_id, user_id } = req.validatedData;
        const createdFeedback = await feedbackService.createFeedback({
            feedback,
            product_id,
            user_id,
        });
        return res.status(201).json(createdFeedback);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await feedbackService.getAllFeedback();
        return res.status(200).json(feedbacks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getFeedbackById = async (req, res) => {
    try {
        const feedback = await feedbackService.getFeedbackById(req.params.id);
        if (feedback) {
            return res.status(200).json(feedback);
        } else {
            return res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateFeedback = async (req, res) => {
    try {
        console.log("UPDATE")
        if(req.feedback.user_id !== req.body.user_id) {
            return res.status(403).json({ message: 'Not allowed to update user' });
        }
        const feedback = await feedbackService.updateFeedback(req.params.id, req.body);
        return res.status(200).json(feedback);
    } catch (error) {
        console.log(error, "ERROR")
        return res.status(500).json({ message: error.message });
    }
};



module.exports = {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    updateFeedback,
}