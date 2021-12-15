const Joi = require("joi");

const createUserPref = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object().keys({
    webLanguageCode: Joi.number().min(1).max(2).required().messages({
      "number.base": "Web language should be a Number",
      "number.empty": "Web language should not be empty",
      "number.min": `Web language should be  greater than or equal to {#limit}`,
      "number.max": `Web language should be  less than or equal to {#limit}`,
      "any.required": "Web language is required",
    }),
    correspondenceLanguageCode: Joi.number().min(1).max(2).required().messages({
      "number.base": "Correspondence language should be a Number",
      "number.empty": "Correspondence language should not be empty",
      "number.min": `Correspondence language should be  greater than or equal to {#limit}`,
      "number.max": `Correspondence language should be  less than or equal to {#limit}`,
      "any.required": "Correspondence language is required",
    }),
    brailleTtyKeyboard: Joi.boolean().required().messages({
      "boolean.base": "Braille/TTY should be a true or false",
      "boolean.empty": "Braille/TTY should not be empty",
      "any.required": "Braille/TTY is required",
    }),
    preferredCurrencyCode: Joi.number().min(1).max(2).required().messages({
      "number.base": "Preferred Currency Code should be a Number",
      "number.empty": "Preferred Currency Code should not be empty",
      "number.min": `Preferred Currency Code should be  greater than or equal to {#limit}`,
      "number.max": `Preferred Currency Code should be  less than or equal to {#limit}`,
      "any.required": "Preferred Currency Code is required",
    }),
    timeZoneCode: Joi.string().min(1).max(50).required(),
    timeFormatCode: Joi.number().min(1).max(2).required().messages({
      "number.base": "Time Format Code should be a Number",
      "number.empty": "Time Format Code should not be empty",
      "number.min": `Time Format Code should be  greater than or equal to {#limit}`,
      "number.max": `Time Format Code should be  less than or equal to {#limit}`,
      "any.required": "Time Format Code is required",
    }),
  }),
};

const getUserPref = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
};

const updateUserPref = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      webLanguageCode: Joi.number().min(1).max(2).required().messages({
        "number.base": "Web language should be a Number",
        "number.empty": "Web language should not be empty",
        "number.min": `Web language should be  greater than or equal to {#limit}`,
        "number.max": `Web language should be  less than or equal to {#limit}`,
        "any.required": "Web language is required",
      }),
      correspondenceLanguageCode: Joi.number()
        .min(1)
        .max(2)
        .required()
        .messages({
          "number.base": "Correspondence language should be a Number",
          "number.empty": "Correspondence language should not be empty",
          "number.min": `Correspondence language should be  greater than or equal to {#limit}`,
          "number.max": `Correspondence language should be  less than or equal to {#limit}`,
          "any.required": "Correspondence language is required",
        }),
      brailleTtyKeyboard: Joi.boolean().required().messages({
        "boolean.base": "Braille/TTY should be a true or false",
        "boolean.empty": "Braille/TTY should not be empty",
        "any.required": "Braille/TTY is required",
      }),
      preferredCurrencyCode: Joi.number().min(1).max(2).required().messages({
        "number.base": "Preferred Currency Code should be a Number",
        "number.empty": "Preferred Currency Code should not be empty",
        "number.min": `Preferred Currency Code should be  greater than or equal to {#limit}`,
        "number.max": `Preferred Currency Code should be  less than or equal to {#limit}`,
        "any.required": "Preferred Currency Code is required",
      }),
      timeZoneCode: Joi.string().min(1).max(50).required(),
      timeFormatCode: Joi.number().min(1).max(2).required().messages({
        "number.base": "Time Format Code should be a Number",
        "number.empty": "Time Format Code should not be empty",
        "number.min": `Time Format Code should be  greater than or equal to {#limit}`,
        "number.max": `Time Format Code should be  less than or equal to {#limit}`,
        "any.required": "Time Format Code is required",
      }),
    })
    .min(1),
};

module.exports = {
  createUserPref,
  updateUserPref,
  getUserPref,
};
