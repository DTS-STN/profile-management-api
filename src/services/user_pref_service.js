const httpStatus = require("http-status");
const logger = require("../config/logger");

const { UserInfo, UserPref, sequelize } = require("../db/models/sequelize");

const createUserPref = async (req, res) => {
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
      const userPref = await userInfo.createUserPref(req.body.userPref[0], {
        transaction: t,
      });

      await t.commit();
      return res
        .status(httpStatus.CREATED)
        .send({ status: httpStatus.CREATED, userPref_uuid: userPref.uuid });
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

const getUserPref = async (req, res) => {
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
          model: UserPref,
          attributes: [
            "webLanguageCode",
            "correspondenceLanguageCode",
            "brailleTtyKeyboard",
            "preferredCurrencyCode",
            "timeZoneCode",
            "timeFormatCode",
          ],
        },
      ],
      where: { uuid: req.params.id },
    });

    if (userInfo.UserPref) {
      return res.status(httpStatus.CREATED).send(userInfo.UserPref);
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "User Pref not found!" });
    }
  } catch (err) {
    logger.error(err);
  }
};

const updateUserPref = async (req, res) => {
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
      include: [UserPref],
      where: { uuid: req.params.id },
    });

    if (userInfo.UserPref) {
      const updatePrefInfo = await userInfo.UserPref.update(
        req.body.userPref[0]
      );
      if (updatePrefInfo) {
        return res
          .status(httpStatus.OK)
          .send({ status: httpStatus.OK, message: "user pref updated" });
      } else {
        return res.status(httpStatus.NOT_MODIFIED).send({
          status: httpStatus.NOT_MODIFIED,
          message: "Failed to update user pref",
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
  getUserPref,
  updateUserPref,
  createUserPref,
};
