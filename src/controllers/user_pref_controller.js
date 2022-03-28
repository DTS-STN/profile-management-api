const userPrefService = require("../services/user_pref_service");

const createUserPref = (req, res) => {
  userPrefService.create(req, res);
};

const getUserPref = (req, res) => {
  userPrefService.get(req, res);
};

const updateUserPref = (req, res) => {
  userPrefService.update(req, res);
};

module.exports = {
  createUserPref,
  getUserPref,
  updateUserPref,
};
