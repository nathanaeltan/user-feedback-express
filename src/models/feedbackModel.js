const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');
const Product = require('./productModel');
const User = require('./userModel');

const Feedback = sequelize.define('feedbacks', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    feedback: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id',
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

module.exports = Feedback;