const httpStatus = require("http-status");
const logger = require("../config/logger");

const PersonalInfo = require("../db/models/PersonalInfo");
const Pref = require("../db/models/UserPref");
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
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

  if (!personalInfo) {
    return res.status(httpStatus.NOT_FOUND).send({
      status: httpStatus.NOT_FOUND,
      message: "User not found!",
      id,
    });
  }

  Pref.findOne({ id })
    .select(
      "webLanguageCode correspondenceLanguageCode brailleTtyKeyboard preferredCurrencyCode  timeZoneCode timeFormatCode  -_id"
    )
    .exec()
    .then((userPref) => {
      res.json({ userPref: userPref });
    })
    .catch((err) => {
      logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
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

  const userPrefBody = req.body;
  userPrefBody.id = id;

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
      id,
    });
  }

  const userPrefsFound = await Pref.findOne({ id })
    .exec()
    .catch((err) => {
      logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

  if (userPrefsFound) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: "User Pref. already exists",
      id: req.params.id,
    });
  }

  const userPref = new Pref(userPrefBody);
  await userPref
    .save()
    .then(async () => {
      res.json({
        status: httpStatus.CREATED,
        message: "Your submission has been successfully submitted.",
      });
    })
    .catch(async (err) => {
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
      id: id,
    });
  }

  Pref.findOneAndUpdate({ id }, req.body)
    .then(() => {
      res.json({
        status: httpStatus.OK,
        data: req.body,
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
