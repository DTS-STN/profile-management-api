const userPrefService = require("../services/user_pref_service");

const createUserPref = (req, res) => {
  userPrefService.createUserPref(req, res);
};

const getUserPref = (req, res) => {
  userPrefService.getUserPref(req, res);
};

const updateUserPref = (req, res) => {
  userPrefService.updateUserPref(req, res);
};

module.exports = {
  createUserPref,
  getUserPref,
  updateUserPref,
};
