const httpStatus = require("http-status");
const logger = require("../config/logger");

const { UserInfo, sequelize } = require("../db/models/sequelize");

const createUserInfo = async (body, res) => {
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
    const userInfo = await UserInfo.create(body.userInfo[0], {
      transaction: t,
    });

    await userInfo.createUserContact(body.userContact[0], {
      transaction: t,
    });

    await t.commit();
    return res
      .status(httpStatus.CREATED)
      .send({ status: httpStatus.CREATED, userInfo_uuid: userInfo.uuid });
  } catch (err) {
    await t.rollback();
    logger.error(err);
  }
};

const getUserInfo = async (req, res) => {
  await sequelize
    .sync()
    .then(function () {
      logger.info("connected to database");
    })
    .catch(function (err) {
      logger.error(err);
    });

  try {
    const userInfo = await UserInfo.findOne({
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

    if (userInfo) {
      return res.status(httpStatus.OK).send({ userInfo });
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "UserInfo not found!" });
    }
  } catch (err) {
    logger.error(err);
  }
};

const updateUserInfo = async (req, res) => {
  await sequelize
    .sync()
    .then(function () {
      logger.info("connected to database");
    })
    .catch(function (err) {
      logger.error(err);
    });

  try {
    const userInfo = await UserInfo.findOne({
      include: [],
      where: { uuid: req.params.id },
    });

    if (userInfo) {
      const updateUserInfo = await UserInfo.update(req.body, {
        where: {
          uuid: req.params.id,
        },
      });
      if (updateUserInfo > 0) {
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
        .send({ message: "UserInfo not found!" });
    }
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  createUserInfo,
  getUserInfo,
  updateUserInfo,
};
