"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserFinancialInfo extends Model {}

  UserFinancialInfo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      institutionNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transitNumber: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      accountNumber: {
        type: DataTypes.BIGINT,
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
      modelName: "UserFinancialInfo",
      tableName: "user_financial_info",
      underscored: true,
      freezeTableName: true,
    }
  );

  return UserFinancialInfo;
};
