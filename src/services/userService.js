const User = require("../models/userModel");

const getUserById = async (id) => {
  return await User.findByPk(id);
};

module.exports = {
  getUserById,
};
