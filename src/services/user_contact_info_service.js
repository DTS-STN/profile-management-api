const httpStatus = require("http-status");
const logger = require("../config/logger");

const {
  UserInfo,
  UserContact,
  UserAddress,
  sequelize,
} = require("../db/models/sequelize");

const createUserContact = async (req, res) => {
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
      include: [UserContact],
      where: { uuid: req.params.id },
    });

    // depending UI, may need to allow multiple addresses
    if (userInfo.UserContact) {
      const userAddress = await userInfo.UserContact.createUserAddress(
        req.body.userAddress[0],
        {
          transaction: t,
        }
      );

      await t.commit();
      return res.status(httpStatus.CREATED).send({
        status: httpStatus.CREATED,
        userAddress_uuid: userAddress.uuid,
        message: "Address added",
      });
    } else {
      return res.status(httpStatus.NOT_FOUND).send({
        status: httpStatus.NOT_FOUND,
        message: "User or contact not found!",
        userInfo_uuid: req.params.id,
      });
    }
  } catch (err) {
    await t.rollback();
    logger.error(err);
  }
};

const getUserContact = async (req, res) => {
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
      include: [{ model: UserContact }],
      where: { uuid: req.params.id },
    });

    if (userInfo.UserContact) {
      const userContact = await UserContact.findOne({
        include: [
          {
            model: UserAddress,
            attributes: [
              "addressTypeCode",
              "aptNumber",
              "streetNumber",
              "streetName",
              "postalCode",
              "city",
              "countryCode",
            ],
          },
        ],
        attributes: ["phone", "email"],
        where: { uuid: userInfo.UserContact.uuid },
      });
      return res.status(httpStatus.OK).send(userContact);
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "User or contact info not found!" });
    }
  } catch (err) {
    logger.error(err);
  }
};

const updateUserContact = async (req, res) => {
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
      include: [{ model: UserContact, include: [UserAddress] }],
      where: { uuid: req.params.id },
    });

    if (userInfo.UserContact) {
      const updateContact = await userInfo.UserContact.update(
        req.body.userContact[0],
        {
          transaction: t,
        }
      );

      if (updateContact) {
        updateContact.UserAddresses.forEach(async (userAddress) => {
          req.body.userAddress.forEach(async (address) => {
            const updateAddress = await userAddress.update(
              address,
              {
                where: {
                  addressTypeCode: address.addressTypeCode,
                },
              },
              {
                transaction: t,
              }
            );

            if (!updateAddress) {
              await t.rollback();
              return res.status(httpStatus.NOT_MODIFIED).send({
                status: httpStatus.NOT_MODIFIED,
                message: "Failed to update contact info",
              });
            }
          });
        });

        await t.commit();
        return res.status(httpStatus.OK).send({
          status: httpStatus.OK,
          message: "contact info updated",
        });
      }
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "User contact not found!" });
    }
  } catch (err) {
    await t.rollback();
    logger.error(err);
  }
};

module.exports = {
  getUserContact,
  updateUserContact,
  createUserContact,
};
