const userPersonalInfoService = require("../services/user_personal_info_service");

const createUserPersonalInfo = (req, res) => {
  userPersonalInfoService.createUserPersonalInfo(req.body, res);
};

const getUserPersonalInfo = (req, res) => {
  userPersonalInfoService.getUserPersonalInfo(req, res);
};

const getAllUserPersonalInfo = (req, res) => {
  userPersonalInfoService.getAllUserPersonalInfo(req, res);
};

const updateUserPersonalInfo = (req, res) => {
  userPersonalInfoService.updateUserPersonalInfo(req, res);
};

module.exports = {
  createUserPersonalInfo,
  getUserPersonalInfo,
  getAllUserPersonalInfo,
  updateUserPersonalInfo,
};
