"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserContact extends Model {}

  UserContact.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
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
      modelName: "UserContact",
      tableName: "user_contact",
      underscored: true,
      freezeTableName: true,
    }
  );

  return UserContact;
};
