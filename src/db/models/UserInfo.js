"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {}

  UserInfo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      sinNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      maritalStatusCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      modelName: "UserInfo",
      tableName: "user_info",
      underscored: true,
      freezeTableName: true,
    }
  );

  return UserInfo;
};
