const userBenefitService = require("../services/user_benefit_service");

const createUserBenefit = (req, res) => {
  userBenefitService.create(req, res);
};

const getUserBenefit = (req, res) => {
  userBenefitService.get(req, res);
};

const updateUserBenefit = (req, res) => {
  userBenefitService.update(req, res);
};

module.exports = {
  createUserBenefit,
  getUserBenefit,
  updateUserBenefit,
};
