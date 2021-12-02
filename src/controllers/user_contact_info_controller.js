const userContactService = require("../services/user_contact_info_service");

const createUserContact = (req, res) => {
  userContactService.createUserContact(req, res);
};

const getUserContact = (req, res) => {
  userContactService.getUserContact(req, res);
};

const updateUserContact = (req, res) => {
  userContactService.updateUserContact(req, res);
};

module.exports = {
  createUserContact,
  getUserContact,
  updateUserContact,
};
