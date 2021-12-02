const httpStatus = require("http-status");
const logger = require("../config/logger");

const { UserInfo, UserAccount, sequelize } = require("../db/models/sequelize");

const createUserAccount = async (req, res) => {
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
    const userInfo = await UserInfo.findOne({
      include: [],
      where: { uuid: req.params.id },
    });

    if (userInfo) {
      const userAccount = await userInfo.createUserAccount(req.body, {
        transaction: t,
      });

      await t.commit();
      return res.status(httpStatus.CREATED).send({
        status: httpStatus.CREATED,
        userAccount_uuid: userAccount.uuid,
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

const getUserAccount = async (req, res) => {
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
      include: [
        {
          model: UserAccount,
          attributes: ["bankCode", "transitNumber", "accountNumber"],
        },
      ],
      where: { uuid: req.params.id },
    });

    if (userInfo.UserAccount) {
      return res.status(httpStatus.OK).send(userInfo.UserAccount);
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "User Account not found!" });
    }
  } catch (err) {
    logger.error(err);
  }
};

const updateUserAccount = async (req, res) => {
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
      include: [UserAccount],
      where: { uuid: req.params.id },
    });

    if (userInfo.UserAccount) {
      const updateUserAccount = await userInfo.UserAccount.update(req.body);
      if (updateUserAccount) {
        return res
          .status(httpStatus.OK)
          .send({ status: httpStatus.OK, message: "Account updated" });
      } else {
        return res.status(httpStatus.NOT_MODIFIED).send({
          status: httpStatus.NOT_MODIFIED,
          message: "Failed to update account",
        });
      }
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "User not found!" });
    }
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  getUserAccount,
  updateUserAccount,
  createUserAccount,
};
