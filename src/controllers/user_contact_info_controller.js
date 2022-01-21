const userContactService = require("../services/user_contact_info_service");

const createUserContact = (req, res) => {
  userContactService.create(req, res);
};

const getUserContact = (req, res) => {
  userContactService.get(req, res);
};

const updateUserContact = (req, res) => {
  userContactService.update(req, res);
};

module.exports = {
  createUserContact,
  getUserContact,
  updateUserContact,
};
