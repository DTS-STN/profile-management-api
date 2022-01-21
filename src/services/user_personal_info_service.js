const httpStatus = require("http-status");
const logger = require("../config/logger");

const PersonalInfo = require("../db/models/PersonalInfo");

const db = require("mongoose");
require("../db/models/mongo").connect();

const getAll = async (req, res) => {
  PersonalInfo.find({})
    .select("firstName middleName lastName")
    .exec()
    .then((userPersonalInfos) => {
      res.json(userPersonalInfos);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

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
    .select(
      "firstName middleName lastName dob sinNumber maritalStatusCode -_id"
    )
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

  return res.status(httpStatus.OK).send(personalInfo);
};

const create = async (req, res) => {
  const { firstName, middleName, lastName, dob, sinNumber, maritalStatusCode } =
    req.body.userPersonalInfo[0];

  const personalInfo = PersonalInfo({
    firstName,
    middleName,
    lastName,
    dob,
    sinNumber,
    maritalStatusCode,
  });
  await personalInfo
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

  PersonalInfo.findOneAndUpdate({ _id: id }, req.body)
    .then(() => {
      res.json({
        status: 200,
        message: "Changes to your account has been successfully updated.",
      });
    })
    .catch((err) => {
      logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};

module.exports = {
  getAll,
  get,
  create,
  update,
};
