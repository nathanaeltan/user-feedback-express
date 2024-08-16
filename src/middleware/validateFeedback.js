const User = require('../models/userModel');
const Product = require('../models/productModel');
const validateFeedback = async (req, res, next) => {
    const { feedback, product_id, user_id } = req.body;

    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        req.validatedData = { feedback, product_id, user_id };

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to validate feedback' });
    }
};

module.exports = {
    validateFeedback,
};