"use strict";

const Sequelize = require("sequelize");
const config = require("../../config/config");

const UserInfoModel = require("./UserInfo");
const UserPrefModel = require("./UserPref");
const UserAccountModel = require("./UserAccount");
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

const UserInfo = UserInfoModel(sequelize, Sequelize.DataTypes);
const UserPref = UserPrefModel(sequelize, Sequelize.DataTypes);
const UserAccount = UserAccountModel(sequelize, Sequelize.DataTypes);
const UserContact = UserContactModel(sequelize, Sequelize.DataTypes);
const UserAddress = UserAddressModel(sequelize, Sequelize.DataTypes);

UserInfo.userPrefs = UserInfo.hasOne(UserPref);
UserPref.belongsTo(UserInfo);

UserInfo.hasOne(UserAccount);
UserAccount.belongsTo(UserInfo);

UserInfo.userContact = UserInfo.hasOne(UserContact);
UserContact.belongsTo(UserInfo);

UserContact.hasMany(UserAddress);
UserAddress.belongsTo(UserContact);

module.exports = {
  UserInfo,
  UserPref,
  UserAccount,
  UserContact,
  UserAddress,
  sequelize,
};
