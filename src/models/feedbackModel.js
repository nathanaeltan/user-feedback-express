const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/config");
const Product = require("./productModel");
const User = require("./userModel");

class Feedback extends Model {}

Feedback.init(
  {
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
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "feedbacks",
    timestamps: false,
  }
);

Feedback.belongsTo(Product, { foreignKey: "product_id" });
Feedback.belongsTo(User, { foreignKey: "user_id" });

module.exports = Feedback;
