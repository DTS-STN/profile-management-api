const userInfoService = require("../services/user_personal_info_service");

const createUserInfo = (req, res) => {
  userInfoService.createUserInfo(req.body, res);
};

const getUserInfo = (req, res) => {
  userInfoService.getUserInfo(req, res);
};

const updateUserInfo = (req, res) => {
  userInfoService.updateUserInfo(req, res);
};

module.exports = {
  createUserInfo,
  getUserInfo,
  updateUserInfo,
};
