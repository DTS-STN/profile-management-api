"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserPref extends Model {}

  UserPref.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      webLanguageCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      correspondenceLanguageCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      brailleTtyKeyboard: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      preferredCurrencyCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      timeZoneCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      timeFormatCode: {
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
      modelName: "UserPref",
      tableName: "user_pref",
      underscored: true,
      freezeTableName: true,
    }
  );

  return UserPref;
};
