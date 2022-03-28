const Joi = require("joi");

const getUserFinancialInfo = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
};

const updateUserFinancialInfo = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      transitNumber: Joi.number().min(10000).max(99999).required().messages({
        "number.base": "Branch or Transit Number should be a Number",
        "number.empty": "Branch or Transit Number should not be empty",
        "number.min": `Branch or Transit Number should be 5 digits long`,
        "number.max": `Branch or Transit Number should be 5 digits long`,
        "any.required": "Branch or Transit Number is required",
      }),
      institutionNumber: Joi.string()
        .length(3)
        .regex(/^[0-9]+$/)
        .required()
        .messages({
          "any.regex": "Financial Institution Number should be a Number",
          "string.empty": "Financial Institution Number should not be empty",
          "string.length": `Financial Institution Number should be 3 digits long`,
          "any.required": "Financial Institution Number is required",
          "string.pattern.base": `Financial Institution Number should be a Number`,
        }),
      accountNumber: Joi.number()
        .min(100000000)
        .max(9999999999999)
        .required()
        .messages({
          "number.base": "Account Number should be a Number",
          "number.empty": "Account Number should not be empty",
          "number.min": `Account Number should be 9 digits long`,
          "number.max": `Account Number should be 13 digits long`,
          "any.required": "Account Number is required",
        }),
    })
    .min(1),
};

const createUserFinancialInfo = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object().keys({
    transitNumber: Joi.number().min(10000).max(99999).required().messages({
      "number.base": "Branch or Transit Number should be a Number",
      "number.empty": "Branch or Transit Number should not be empty",
      "number.min": `Branch or Transit Number should be 5 digits long`,
      "number.max": `Branch or Transit Number should be 5 digits long`,
      "any.required": "Branch or Transit Number is required",
    }),
    institutionNumber: Joi.string()
      .length(3)
      .regex(/^[0-9]+$/)
      .required()
      .messages({
        "any.regex": "Financial Institution Number should be a Number",
        "string.empty": "Financial Institution Number should not be empty",
        "string.length": `Financial Institution Number should be 3 digits long`,
        "any.required": "Financial Institution Number is required",
        "string.pattern.base": `Financial Institution Number should be a Number`,
      }),
    accountNumber: Joi.number()
      .min(100000000)
      .max(9999999999999)
      .required()
      .messages({
        "number.base": "Account Number should be a Number",
        "number.empty": "Account Number should not be empty",
        "number.min": `Account Number should be 9 digits long`,
        "number.max": `Account Number should be 13 digits long`,
        "any.required": "Account Number is required",
      }),
  }),
};

module.exports = {
  createUserFinancialInfo,
  getUserFinancialInfo,
  updateUserFinancialInfo,
};
