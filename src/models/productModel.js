const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/config");
const Feedback = require("./feedbackModel");

class Product extends Model {}
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "products",
  }
);


module.exports = Product;
