"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserAccount extends Model {}

  UserAccount.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      bankCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transitNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accountNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      // start: audit and common info - applies to all tables
      effectiveDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      // end: audit and common info - applies to all tables
      // note: createAt and modifiedAt created automatically by sequeline
    },
    {
      sequelize,
      modelName: "UserAccount",
      tableName: "user_account",
      underscored: true,
      freezeTableName: true,
    }
  );

  return UserAccount;
};
