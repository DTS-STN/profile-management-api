"use strict";

const Sequelize = require("sequelize");
const config = require("../../config/config");

const UserPersonalInfoModel = require("./UserPersonalInfo");
const UserPrefModel = require("./UserPref");
const UserFinancialInfoModel = require("./UserFinancialInfo");
const UserContactModel = require("./UserContact");
const UserAddressModel = require("./UserAddress");

const sequelize = new Sequelize(config.db, config.user, config.password, {
  dialect: "mssql",
  host: config.server,
  logging: false,
  pool: {
    min: 0,
    max: 10,
    acquire: 30000,
    idle: 10000,
  },
});

const UserPersonalInfo = UserPersonalInfoModel(sequelize, Sequelize.DataTypes);
const UserPref = UserPrefModel(sequelize, Sequelize.DataTypes);
const UserFinancialInfo = UserFinancialInfoModel(
  sequelize,
  Sequelize.DataTypes
);
const UserContact = UserContactModel(sequelize, Sequelize.DataTypes);
const UserAddress = UserAddressModel(sequelize, Sequelize.DataTypes);

UserPersonalInfo.userPrefs = UserPersonalInfo.hasOne(UserPref);
UserPref.belongsTo(UserPersonalInfo);

UserPersonalInfo.hasOne(UserFinancialInfo);
UserFinancialInfo.belongsTo(UserPersonalInfo);

UserPersonalInfo.userContact = UserPersonalInfo.hasOne(UserContact);
UserContact.belongsTo(UserPersonalInfo);

UserContact.hasMany(UserAddress, {
  as: "userAddresses",
  foreignKey: "user_contact_id",
});
UserAddress.belongsTo(UserContact);

module.exports = {
  UserPersonalInfo,
  UserPref,
  UserFinancialInfo,
  UserContact,
  UserAddress,
  sequelize,
};
