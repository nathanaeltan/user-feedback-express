const Feedback = require("../models/feedbackModel");

const validateFeedbackExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const feedback = await Feedback.findByPk(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    req.feedback = feedback;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = validateFeedbackExists;
