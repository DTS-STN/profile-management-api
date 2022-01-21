const httpStatus = require("http-status");
const logger = require("../config/logger");

const Contact = require("../db/models/ContactInfo");
const PersonalInfo = require("../db/models/PersonalInfo");

const db = require("mongoose");
require("../db/models/mongo").connect();

const get = async (req, res) => {
  const { id } = req.params;

  if (!db.Types.ObjectId.isValid(id)) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: "Invalid ID provided!",
      id,
    });
  }

  const personalInfo = await PersonalInfo.findById(id)
    .exec()
    .catch((err) => {
      logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

  if (!personalInfo) {
    return res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: "User not found!",
      id: req.params.id,
    });
  }

  Contact.findOne({ id })
    .select("phone email userAddresses -_id")
    .exec()
    .then((userContact) => {
      res.json({ userContact: userContact });
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send(err);
    });
};

const create = async (req, res) => {
  const { id } = req.params;

  if (!db.Types.ObjectId.isValid(id)) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: "Invalid ID provided!",
      id,
    });
  }

  const contactDetails = req.body;
  contactDetails.id = id;

  const personalInfo = await PersonalInfo.findById(id)
    .exec()
    .catch((err) => {
      logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

  if (!personalInfo) {
    return res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: "User not found!",
      id: req.params.id,
    });
  }

  const contactInfoFound = await Contact.findOne({ id })
    .exec()
    .catch((err) => {
      logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

  if (contactInfoFound) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: "Contact Info already exists",
      id: req.params.id,
    });
  }
  const contact = new Contact(contactDetails);
  await contact
    .save()
    .then(async () => {
      res.json({
        status: httpStatus.CREATED,
        message: "Your submission has been successfully submitted.",
      });
    })
    .catch(async (err) => {
      logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

const update = async (req, res) => {
  const { id } = req.params;

  if (!db.Types.ObjectId.isValid(id)) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: "Invalid ID provided!",
      id,
    });
  }

  const personalInfo = await PersonalInfo.findById(id)
    .exec()
    .catch((err) => {
      logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

  if (!personalInfo) {
    return res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: "User not found!",
      id: req.params.id,
    });
  }

  Contact.findOneAndUpdate({ id }, req.body)
    .then(() => {
      res.json({
        status: httpStatus.OK,
        data: { userContact: req.body },
        message: "Changes to your account has been successfully updated.",
      });
    })
    .catch((err) => {
      logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

module.exports = {
  get,
  create,
  update,
};
