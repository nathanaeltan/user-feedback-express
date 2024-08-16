const Product = require("../models/productModel");

const getProductById = async (id) => {
  return await Product.findByPk(id);
};

module.exports = {
  getProductById,
};
