const userFinancialInfoService = require("../services/user_financial_info_service");

const createUserFinancialInfo = (req, res) => {
  userFinancialInfoService.create(req, res);
};

const getUserFinancialInfo = (req, res) => {
  userFinancialInfoService.get(req, res);
};

const updateUserFinancialInfo = (req, res) => {
  userFinancialInfoService.update(req, res);
};

module.exports = {
  createUserFinancialInfo,
  getUserFinancialInfo,
  updateUserFinancialInfo,
};
