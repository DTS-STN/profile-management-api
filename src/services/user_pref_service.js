const httpStatus = require("http-status");
const logger = require("../config/logger");

const {
  UserPersonalInfo,
  UserPref,
  sequelize,
} = require("../db/models/sequelize");

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
    const userPersonalInfo = await UserPersonalInfo.findOne({
      include: [UserPref],
      where: { uuid: req.params.id },
    });

    if (!userPersonalInfo) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ status: httpStatus.NOT_FOUND, message: "User not found!" });
    }

    if (userPersonalInfo.UserPref) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: httpStatus.BAD_REQUEST,
        message: "User Preferences already exists!",
      });
    }

    if (userPersonalInfo) {
      const userPref = await userPersonalInfo.createUserPref(req.body, {
        transaction: t,
      });

      await t.commit();
      return res.status(httpStatus.CREATED).send({
        status: httpStatus.CREATED,
        data: userPref,
        message: "Your submission has been successfully submitted.",
      });
    } else {
      return res.status(httpStatus.NOT_FOUND).send({
        status: httpStatus.NOT_FOUND,
        message: "User not found!",
        userPersonalInfo_uuid: req.params.id,
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
    const userPersonalInfo = await UserPersonalInfo.findOne({
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
    if (!userPersonalInfo) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ status: httpStatus.NOT_FOUND, message: "User not found!" });
    }

    if (userPersonalInfo && userPersonalInfo.UserPref) {
      return res.status(httpStatus.CREATED).send({
        status: httpStatus.OK,
        firstName: userPersonalInfo.firstName,
        userPref: userPersonalInfo.UserPref,
      });
    } else {
      return res.status(httpStatus.NOT_FOUND).send({
        status: httpStatus.NOT_FOUND,
        firstName: userPersonalInfo.firstName,
        message: "User Preferences not found!",
      });
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
    const userPersonalInfo = await UserPersonalInfo.findOne({
      include: [UserPref],
      where: { uuid: req.params.id },
    });

    if (!userPersonalInfo) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ status: httpStatus.NOT_FOUND, message: "User not found!" });
    }

    if (!userPersonalInfo.UserPref) {
      return res.status(httpStatus.NOT_FOUND).send({
        status: httpStatus.NOT_FOUND,
        message: "User Preferences not found!",
      });
    }

    if (userPersonalInfo && userPersonalInfo.UserPref) {
      const updatePrefInfo = await userPersonalInfo.UserPref.update(req.body);
      if (updatePrefInfo) {
        return res.status(httpStatus.OK).send({
          status: httpStatus.OK,
          message: "Changes to your account has been successfully updated.",
        });
      } else {
        return res.status(httpStatus.NOT_MODIFIED).send({
          status: httpStatus.NOT_MODIFIED,
          message: "Failed to update user Preferences",
        });
      }
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "User or User Preferences not found!" });
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
