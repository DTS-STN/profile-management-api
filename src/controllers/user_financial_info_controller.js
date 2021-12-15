const userFinancialInfoService = require("../services/user_financial_info_service");

const createUserFinancialInfo = (req, res) => {
  userFinancialInfoService.createUserFinancialInfo(req, res);
};

const getUserFinancialInfo = (req, res) => {
  userFinancialInfoService.getUserFinancialInfo(req, res);
};

const updateUserFinancialInfo = (req, res) => {
  userFinancialInfoService.updateUserFinancialInfo(req, res);
};

module.exports = {
  createUserFinancialInfo,
  getUserFinancialInfo,
  updateUserFinancialInfo,
};
