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
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createFeedback,
    getAllFeedback,
}