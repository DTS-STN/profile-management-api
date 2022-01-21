const httpStatus = require("http-status");
const logger = require("../config/logger");

const PersonalInfo = require("../db/models/PersonalInfo");
const FinancialInfo = require("../db/models/FinancialInfo");

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

  await FinancialInfo.findOne({ id })
    .select("institutionNumber transitNumber accountNumber -_id")
    .exec()
    .then((userFinancialInfo) => {
      res.json({ userFinancialInfo: userFinancialInfo });
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

  const financialInfoBody = req.body;
  financialInfoBody.id = id;

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

  const financialInfoFound = await FinancialInfo.findOne({ id })
    .exec()
    .catch((err) => {
      logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

  if (financialInfoFound) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: "Financial Info already exists",
      id: req.params.id,
    });
  }

  var financialInfo = new FinancialInfo(financialInfoBody);
  await financialInfo
    .save()
    .then(async () => {
      return res.status(httpStatus.CREATED).send({
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

  FinancialInfo.findOneAndUpdate({ id }, req.body)
    .then(() => {
      return res.status(httpStatus.OK).send({
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
