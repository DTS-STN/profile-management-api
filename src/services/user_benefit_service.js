const httpStatus = require("http-status");
const logger = require("../config/logger");

const BenefitInfo = require("../db/models/BenefitInfo");
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

  BenefitInfo.findOne({ id })
    .select("benefits -_id")
    .exec()
    .then((benefits) => {
      res.json({ firstName: personalInfo.firstName, benefitInfo: benefits });
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

  const benefitDetails = req.body;
  benefitDetails.id = id;

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

  const benefitInfoFound = await BenefitInfo.findOne({ id })
    .exec()
    .catch((err) => {
      logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

  const benefitInfo = new BenefitInfo(benefitDetails);

  if (benefitInfoFound) {
    return res.status(httpStatus.BAD_REQUEST).send({
      status: httpStatus.BAD_REQUEST,
      message: "Benefit Info already exists",
      id: req.params.id,
    });
  }

  await benefitInfo
    .save()
    .then(async () => {
      res.json({
        status: httpStatus.CREATED,
        data: benefitDetails,
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

  BenefitInfo.findOneAndUpdate({ id }, req.body)
    .then(() => {
      res.json({
        status: httpStatus.OK,
        data: { benefitInfo: req.body },
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
