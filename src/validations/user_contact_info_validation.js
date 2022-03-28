const baseJoi = require("joi");
const Joi = baseJoi.extend(require("joi-postalcode"));

const createUserContact = {
  body: Joi.object().keys({
    userAddresses: Joi.array()
      .items(
        Joi.object().keys({
          addressTypeCode: Joi.number().required().min(1).max(2).messages({
            "number.base": "Address Type should be a Number",
            "number.empty": "Address Type should not be empty",
            "number.min": `Address Type should be greater than or equal to {#limit}`,
            "number.max": `Address Type should be less than or equal to {#limit}`,
            "any.required": "Address Type is required",
          }),
          aptNumber: Joi.number().allow(null).min(1).max(9999999999).messages({
            "number.base": "Apartment Number should be a Number",
            "number.empty": "Apartment Number should not be empty",
            "number.min": `Apartment Number should be greater than {#limit}`,
            "number.max": `Apartment Number should be a maximum of 10 digits long`,
            "any.required": "Apartment Nunber is required",
          }),
          streetNumber: Joi.number()
            .integer()
            .min(1)
            .max(9999999999)
            .required()
            .messages({
              "number.base": "Street Number should be a Number",
              "number.empty": "Street Number should not be empty",
              "number.min": `Street Number should be greater than {#limit}`,
              "number.max": `Street Number should be a maximum of 10 digits long`,
              "any.required": "Street Number is required",
            }),
          streetName: Joi.string().required().min(1).max(50).messages({
            "string.empty": "Street Name should not be empty",
            "string.min": `Street Name should be at least {#limit} characters long`,
            "string.max": `Street Name should be at most {#limit} characters long`,
            "any.required": "Street Name is required",
          }),
          city: Joi.string().required().min(1).max(50).messages({
            "string.empty": "City should not be empty",
            "string.min": `City Should be at least {#limit} characters long`,
            "string.max": `City Should be at most {#limit} characters long`,
            "any.required": "City is required",
          }),
          postalCode: Joi.string().postalCode("CA").required().messages({
            "string.empty": "Postal Code should not be empty",
            "any.required": "Postal Code is required",
          }),
          countryCode: Joi.string().length(2).required().messages({
            "string.empty": "Country should not be empty",
            "string.length": `Country length should be exactly 2`,
            "any.required": "Country is required",
          }),
          expiryDate: Joi.date().allow(null),
        })
      )
      .required()
      .min(1)
      .max(2),

    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.length": "Phone Number should be 10 digits long",
        "string.empty": "Phone Number should not be empty",
        "any.required": "Phone Number is required",
        "string.pattern.base": `Phone Number should be Numbers only`,
      }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Email format is incorrect. Example: email@example.com",
        "string.empty": "Email should not be empty",
        "any.required": "Email is required",
      }),
  }),
};

const updateUserContact = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      userAddresses: Joi.array()
        .items(
          Joi.object().keys({
            addressTypeCode: Joi.number().required().min(1).max(2).messages({
              "number.base": "Address Type should be a Number",
              "number.empty": "Address Type should not be empty",
              "number.min": `Address Type should be greater than or equal to {#limit}`,
              "number.max": `Address Type should be less than or equal to {#limit}`,
              "any.required": "Address Type is required",
            }),
            aptNumber: Joi.number()
              .allow(null)
              .min(1)
              .max(9999999999)
              .messages({
                "number.base": "Apartment Number should be a Number",
                "number.empty": "Apartment Number should not be empty",
                "number.min": `Apartment Number should be greater than {#limit}`,
                "number.max": `Apartment Number should be a maximum of 10 digits long`,
                "any.required": "Apartment Nunber is required",
              }),
            streetNumber: Joi.number()
              .integer()
              .min(1)
              .max(9999999999)
              .required()
              .messages({
                "number.base": "Street Number should be a Number",
                "number.empty": "Street Number should not be empty",
                "number.min": `Street Number should be greater than {#limit}`,
                "number.max": `Street Number should be a maximum of 10 digits long`,
                "any.required": "Street Number is required",
              }),
            streetName: Joi.string().required().min(1).max(50).messages({
              "string.empty": "Street Name should not be empty",
              "string.min": `Street Name should be at least {#limit} characters long`,
              "string.max": `Street Name should be at most {#limit} characters long`,
              "any.required": "Street Name is required",
            }),
            city: Joi.string().required().min(1).max(50).messages({
              "string.empty": "City should not be empty",
              "string.min": `City Should be at least {#limit} characters long`,
              "string.max": `City Should be at most {#limit} characters long`,
              "any.required": "City is required",
            }),
            postalCode: Joi.string().postalCode("CA").required().messages({
              "string.empty": "Postal Code should not be empty",
              "any.required": "Postal Code is required",
            }),
            countryCode: Joi.string().length(2).required().messages({
              "string.empty": "Country should not be empty",
              "string.length": `Country length should be exactly 2`,
              "any.required": "Country is required",
            }),
            expiryDate: Joi.date().allow(null),
          })
        )
        .required()
        .min(1)
        .max(2),

      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
          "string.length": "Phone Number should be 10 digits long",
          "string.empty": "Phone Number should not be empty",
          "any.required": "Phone Number is required",
          "string.pattern.base": `Phone Number should be Numbers only`,
        }),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
          "string.email":
            "Email format is incorrect. Example: email@example.com",
          "string.empty": "Email should not be empty",
          "any.required": "Email is required",
        }),
    })
    .min(1),
};

const getUserContact = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
};

module.exports = {
  createUserContact,
  getUserContact,
  updateUserContact,
};
