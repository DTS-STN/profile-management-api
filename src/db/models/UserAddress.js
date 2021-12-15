"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {}

  UserAddress.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      addressTypeCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      aptNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      streetNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      streetName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING,
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
      modelName: "UserAddress",
      tableName: "user_address",
      underscored: true,
      freezeTableName: true,
      indexes: [
        { unique: true, fields: ["address_type_code", "user_contact_id"] },
      ],
    }
  );

  return UserAddress;
};
