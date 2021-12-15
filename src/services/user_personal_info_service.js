const httpStatus = require("http-status");
const logger = require("../config/logger");

const { UserPersonalInfo, sequelize } = require("../db/models/sequelize");

const createUserPersonalInfo = async (body, res) => {
  await sequelize
    .sync()
    .then(function () {
      logger.info("connected to database");
    })
    .catch(function (err) {
      logger.error(err);
    });

  const t = await sequelize.transaction();

  try {
    const userPersonalInfo = await UserPersonalInfo.create(
      body.userPersonalInfo[0],
      {
        transaction: t,
      }
    );

    await t.commit();
    return res.status(httpStatus.CREATED).send({
      status: httpStatus.CREATED,
      userPersonalInfo_uuid: userPersonalInfo.uuid,
    });
  } catch (err) {
    await t.rollback();
    logger.error(err);
  }
};

const getUserPersonalInfo = async (req, res) => {
  await sequelize
    .sync()
    .then(function () {
      logger.info("connected to database");
    })
    .catch(function (err) {
      logger.error(err);
    });

  try {
    const userPersonalInfo = await UserPersonalInfo.findOne({
      include: [],
      where: { uuid: req.params.id },
      attributes: [
        "uuid",
        "firstName",
        "middleName",
        "lastName",
        "dob",
        "sinNumber",
        "maritalStatusCode",
      ],
    });

    if (userPersonalInfo) {
      return res.status(httpStatus.OK).send({ userPersonalInfo });
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "UserPersonalInfo not found!" });
    }
  } catch (err) {
    logger.error(err);
  }
};

const getAllUserPersonalInfo = async (req, res) => {
  await sequelize
    .sync()
    .then(function () {
      logger.info("connected to database");
    })
    .catch(function (err) {
      logger.error(err);
    });

  try {
    const userPersonalInfos = await UserPersonalInfo.findAll({
      include: [],
      attributes: ["uuid", "firstName", "middleName", "lastName"],
    });

    if (userPersonalInfos) {
      return res.status(httpStatus.OK).send({ userPersonalInfos });
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "UserPersonalInfo not found!" });
    }
  } catch (err) {
    logger.error(err);
  }
};

const updateUserPersonalInfo = async (req, res) => {
  await sequelize
    .sync()
    .then(function () {
      logger.info("connected to database");
    })
    .catch(function (err) {
      logger.error(err);
    });

  try {
    const userPersonalInfo = await UserPersonalInfo.findOne({
      include: [],
      where: { uuid: req.params.id },
    });

    if (userPersonalInfo) {
      const updateUserPersonalInfo = await UserPersonalInfo.update(req.body, {
        where: {
          uuid: req.params.id,
        },
      });
      if (updateUserPersonalInfo > 0) {
        return res
          .status(httpStatus.OK)
          .send({ status: httpStatus.OK, message: "updated" });
      } else {
        return res.status(httpStatus.NOT_MODIFIED).send({
          status: httpStatus.NOT_MODIFIED,
          message: "Failed to update",
        });
      }
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "UserPersonalInfo not found!" });
    }
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  createUserPersonalInfo,
  getUserPersonalInfo,
  getAllUserPersonalInfo,
  updateUserPersonalInfo,
};
