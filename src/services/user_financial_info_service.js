const httpStatus = require("http-status");
const logger = require("../config/logger");

const {
  UserPersonalInfo,
  UserFinancialInfo,
  sequelize,
} = require("../db/models/sequelize");

const createUserFinancialInfo = async (req, res) => {
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
    const userInfo = await UserPersonalInfo.findOne({
      include: [UserFinancialInfo],
      where: { uuid: req.params.id },
    });

    if (userInfo && userInfo.UserFinancialInfo) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: httpStatus.BAD_REQUEST,
        message: "Financial Info already exists",
      });
    }

    if (userInfo && !userInfo.UserFinancialInfo) {
      const userFinancialInfo = await userInfo.createUserFinancialInfo(
        req.body,
        {
          transaction: t,
        }
      );

      await t.commit();
      return res.status(httpStatus.CREATED).send({
        status: httpStatus.CREATED,
        userFinancialInfo_uuid: userFinancialInfo.uuid,
        message: "Financial Info added",
      });
    } else {
      return res.status(httpStatus.NOT_FOUND).send({
        status: httpStatus.NOT_FOUND,
        message: "User not found!",
        userInfo_uuid: req.params.id,
      });
    }
  } catch (err) {
    await t.rollback();
    logger.error(err);
  }
};

const getUserFinancialInfo = async (req, res) => {
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
      include: [
        {
          model: UserFinancialInfo,
          attributes: ["institutionNumber", "transitNumber", "accountNumber"],
        },
      ],
      where: { uuid: req.params.id },
    });

    if (userPersonalInfo && userPersonalInfo.UserFinancialInfo) {
      return res.status(httpStatus.OK).send(userPersonalInfo.UserFinancialInfo);
    } else {
      return res.status(httpStatus.NOT_FOUND).send({
        status: httpStatus.NOT_FOUND,
        message: "User or  Financial Info not found!",
      });
    }
  } catch (err) {
    logger.error(err);
  }
};

const updateUserFinancialInfo = async (req, res) => {
  await sequelize
    .sync()
    .then(function () {
      logger.info("connected to database");
    })
    .catch(function (err) {
      logger.error(err);
    });

  try {
    const userInfo = await UserPersonalInfo.findOne({
      include: [UserFinancialInfo],
      where: { uuid: req.params.id },
    });

    if (userInfo && userInfo.UserFinancialInfo) {
      const updateUserFinancialInfo = await userInfo.UserFinancialInfo.update(
        req.body
      );

      if (updateUserFinancialInfo) {
        return res
          .status(httpStatus.OK)
          .send({ status: httpStatus.OK, message: "Financial Info updated" });
      } else {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Failed to update financial info",
        });
      }
    } else {
      return res.status(httpStatus.NOT_FOUND).send({
        status: httpStatus.NOT_FOUND,
        message: "User financial Info not found!",
      });
    }
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  getUserFinancialInfo,
  updateUserFinancialInfo,
  createUserFinancialInfo,
};
