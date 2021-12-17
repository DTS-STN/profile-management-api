const httpStatus = require("http-status");
const logger = require("../config/logger");

const {
  UserPersonalInfo,
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
    const userPersonalInfo = await UserPersonalInfo.findOne({
      include: [
        {
          model: UserContact,
          include: [{ model: UserAddress, as: "userAddresses" }],
        },
      ],
      where: { uuid: req.params.id },
    });

    if (!userPersonalInfo) {
      return res.status(httpStatus.NOT_FOUND).send({
        status: httpStatus.NOT_FOUND,
        message: "User not found!",
        userPersonalInfo_uuid: req.params.id,
      });
    }

    if (userPersonalInfo && !userPersonalInfo.UserContact) {
      const createContact = await userPersonalInfo.createUserContact(
        req.body,
        {
          include: [{ model: UserAddress, as: "userAddresses" }],
        },
        {
          transaction: t,
        }
      );
      if (createContact) {
        await t.commit();
        return res.status(httpStatus.CREATED).send({
          status: httpStatus.CREATED,
          message: "Your submission has been successfully submitted.",
        });
      } else {
        await t.rollback();
        return res.status(httpStatus.NOT_MODIFIED).send({
          status: httpStatus.NOT_MODIFIED,
          message: "Failed to add contact info",
        });
      }
    } else {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: httpStatus.BAD_REQUEST,
        message:
          "User Contact already exists, use update method to add additional address!",
        userPersonalInfo_uuid: req.params.id,
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
    const userPersonalInfo = await UserPersonalInfo.findOne({
      include: [{ model: UserContact }],
      where: { uuid: req.params.id },
    });

    if (userPersonalInfo && userPersonalInfo.UserContact) {
      const userContact = await UserContact.findOne({
        include: [
          {
            model: UserAddress,
            as: "userAddresses",
            attributes: [
              "addressTypeCode",
              "aptNumber",
              "streetNumber",
              "streetName",
              "postalCode",
              "city",
              "countryCode",
            ],
            where: { expiryDate: null },
          },
        ],
        attributes: ["phone", "email"],
        where: { uuid: userPersonalInfo.UserContact.uuid },
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
    const userPersonalInfo = await UserPersonalInfo.findOne({
      include: [
        {
          model: UserContact,
          include: [{ model: UserAddress, as: "userAddresses" }],
        },
      ],
      where: { uuid: req.params.id },
    });

    if (!userPersonalInfo || !userPersonalInfo.UserContact) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "User or User contact not found!" });
    }

    if (userPersonalInfo && userPersonalInfo.UserContact) {
      const updateContact = await userPersonalInfo.UserContact.update(
        req.body,
        {
          transaction: t,
        }
      );

      if (updateContact) {
        req.body.userAddresses.forEach(async (address) => {
          const updateAddress = await UserAddress.update(
            address,
            {
              where: {
                addressTypeCode: address.addressTypeCode,
                user_contact_id: updateContact.id,
              },
            },
            {
              transaction: t,
            }
          );

          if (updateAddress[0] === 0) {
            await updateContact.createUserAddress(address);
          }
        });

        await t.commit();
        return res.status(httpStatus.OK).send({
          status: httpStatus.OK,
          message: "Changes to your account has been successfully updated.",
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
