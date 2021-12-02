const userAccountService = require("../services/user_financial_info_service");

const createUserAccount = (req, res) => {
  userAccountService.createUserAccount(req, res);
};

const getUserAccount = (req, res) => {
  userAccountService.getUserAccount(req, res);
};

const updateUserAccount = (req, res) => {
  userAccountService.updateUserAccount(req, res);
};

module.exports = {
  createUserAccount,
  getUserAccount,
  updateUserAccount,
};
