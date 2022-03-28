const Joi = require("joi").extend(require("@joi/date"));

const createUserBenefit = {
  body: Joi.object().keys({
    benefits: Joi.array()
      .items(
        Joi.object().keys({
          benefitType: Joi.string().required().min(1).max(50).messages({
            "string.empty": "Benefit Type should not be empty",
            "string.min": `Benefit Type should be at least {#limit} characters long`,
            "string.max": `Benefit Type should be at most {#limit} characters long`,
            "any.required": "Benefit Type is required",
          }),
          applicationStatus: Joi.string().required().min(1).max(50).messages({
            "string.empty": "Application Status should not be empty",
            "string.min": `Application Status should be at least {#limit} characters long`,
            "string.max": `Application Status should be at most {#limit} characters long`,
            "any.required": "SApplication Status is required",
          }),
          paymentAmount: Joi.number()
            .required()
            .positive()
            .allow(null)
            .min(1)
            .messages({
              "number.base": "Payment Amount should be a Number",
              "number.empty": "Payment Amount should not be empty",
              "number.min": `Payment Amount should be greater than {#limit}`,
              "any.required": "Payment Amount is required",
            }),
          paymentDate: Joi.date()
            .format("MMM DD, YYYY")
            .required()
            .raw()
            .messages({
              "date.empty": "Payment date should not be empty",
              "date.required": "Payment date is required",
              "date.pattern.base": `Payment date should be a date`,
            }),
        })
      )
      .required()
      .min(1),
  }),
};

const updateUserBenefit = {
  body: Joi.object().keys({
    benefits: Joi.array()
      .items(
        Joi.object().keys({
          benefitType: Joi.string().required().min(1).max(50).messages({
            "string.empty": "Benefit Type should not be empty",
            "string.min": `Benefit Type should be at least {#limit} characters long`,
            "string.max": `Benefit Type should be at most {#limit} characters long`,
            "any.required": "Benefit Type is required",
          }),
          applicationStatus: Joi.string().required().min(1).max(50).messages({
            "string.empty": "Application Status should not be empty",
            "string.min": `Application Status should be at least {#limit} characters long`,
            "string.max": `Application Status should be at most {#limit} characters long`,
            "any.required": "SApplication Status is required",
          }),
          paymentAmount: Joi.number()
            .required()
            .positive()
            .allow(null)
            .min(1)
            .messages({
              "number.base": "Payment Amount should be a Number",
              "number.empty": "Payment Amount should not be empty",
              "number.min": `Payment Amount should be greater than {#limit}`,
              "any.required": "Payment Amount is required",
            }),
          paymentDate: Joi.date()
            .format("MMM DD, YYYY")
            .required()
            .raw()
            .messages({
              "date.empty": "Payment date should not be empty",
              "date.required": "Payment date is required",
              "date.pattern.base": `Payment date should be a date`,
            }),
        })
      )
      .required()
      .min(1),
  }),
};
const getUserBenefit = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
};

module.exports = {
  createUserBenefit,
  updateUserBenefit,
  getUserBenefit,
};
