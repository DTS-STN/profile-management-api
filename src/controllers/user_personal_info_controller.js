const userPersonalInfoService = require("../services/user_personal_info_service");

const createUserPersonalInfo = (req, res) => {
  userPersonalInfoService.create(req, res);
};

const getUserPersonalInfo = (req, res) => {
  userPersonalInfoService.get(req, res);
};

const getAllUserPersonalInfo = (req, res) => {
  userPersonalInfoService.getAll(req, res);
};

const updateUserPersonalInfo = (req, res) => {
  userPersonalInfoService.update(req, res);
};

module.exports = {
  createUserPersonalInfo,
  getUserPersonalInfo,
  getAllUserPersonalInfo,
  updateUserPersonalInfo,
};
