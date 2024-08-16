const Feedback = require('../models/feedbackModel');
const Product = require('../models/productModel');

const createFeedback = async (data) => {
    return await Feedback.create(data);
}

const getAllFeedback = async () => {
    return await Feedback.findAll({
        include: Product,
    });
}

const getFeedbackById = async (id) => {
    return await Feedback.findByPk(id, {
        include: Product,
    });
};

const updateFeedback = async (id, data) => {
    await Feedback.update(data, { where: { id } });
    return await getFeedbackById(id);
};

const deleteFeedback = async (id) => {
    return await Feedback.destroy({ where: { id } });
};
module.exports = {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
};
