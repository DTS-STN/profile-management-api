const Joi = require("joi");

const createUserPref = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object().keys({
    webLanguageCode: Joi.number().min(1).max(2).required().messages({
      "number.base": "Web language should be selected",
      "number.empty": "Web language should not be empty",
      "number.min": `Web language should be greater than or equal to {#limit}`,
      "number.max": `Web language should be less than or equal to {#limit}`,
      "any.required": "Web language is required",
    }),
    correspondenceLanguageCode: Joi.number().min(1).max(2).required().messages({
      "number.base": "Communication language should be selected",
      "number.empty": "Communication language should not be empty",
      "number.min": `Communication language should be greater than or equal to {#limit}`,
      "number.max": `Communication language should be less than or equal to {#limit}`,
      "any.required": "Communication language is required",
    }),
    brailleTtyKeyboard: Joi.boolean().required().messages({
      "boolean.base": "Braille/TTY should be selected",
      "boolean.empty": "Braille/TTY should not be empty",
      "any.required": "Braille/TTY is required",
    }),
    preferredCurrencyCode: Joi.number().min(1).max(2).required().messages({
      "number.base": "Preferred Currency Code should be selected",
      "number.empty": "Preferred Currency Code should not be empty",
      "number.min": `Preferred Currency Code should be greater than or equal to {#limit}`,
      "number.max": `Preferred Currency Code should be less than or equal to {#limit}`,
      "any.required": "Preferred Currency Code is required",
    }),
    timeZoneCode: Joi.string().min(1).max(50).required().messages({
      "string.empty": "Time Zone should not be empty",
      "string.min": `Time Zone should be at least {#limit} characters long`,
      "string.max": `Time Zone should be at most {#limit} characters long`,
      "any.required": "Time Zone is required",
    }),
    timeFormatCode: Joi.number().min(1).max(2).required().messages({
      "number.base": "Time Format Code should be selected",
      "number.empty": "Time Format Code should not be empty",
      "number.min": `Time Format Code should be greater than or equal to {#limit}`,
      "number.max": `Time Format Code should be less than or equal to {#limit}`,
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
        "number.base": "Web language should be selected",
        "number.empty": "Web language should not be empty",
        "number.min": `Web language should be greater than or equal to {#limit}`,
        "number.max": `Web language should be less than or equal to {#limit}`,
        "any.required": "Web language is required",
      }),
      correspondenceLanguageCode: Joi.number()
        .min(1)
        .max(2)
        .required()
        .messages({
          "number.base": "Communication language should be selected",
          "number.empty": "Communication language should not be empty",
          "number.min": `Communication language should be greater than or equal to {#limit}`,
          "number.max": `Communication language should be less than or equal to {#limit}`,
          "any.required": "Communication language is required",
        }),
      brailleTtyKeyboard: Joi.boolean().required().messages({
        "boolean.base": "Braille/TTY should be selected",
        "boolean.empty": "Braille/TTY should not be empty",
        "any.required": "Braille/TTY is required",
      }),
      preferredCurrencyCode: Joi.number().min(1).max(2).required().messages({
        "number.base": "Preferred Currency Code should be selected",
        "number.empty": "Preferred Currency Code should not be empty",
        "number.min": `Preferred Currency Code should be greater than or equal to {#limit}`,
        "number.max": `Preferred Currency Code should be less than or equal to {#limit}`,
        "any.required": "Preferred Currency Code is required",
      }),
      timeZoneCode: Joi.string().min(1).max(50).required().messages({
        "string.empty": "Time Zone should not be empty",
        "string.min": `Time Zone should be at least {#limit} characters long`,
        "string.max": `Time Zone should be at most {#limit} characters long`,
        "any.required": "Time Zone is required",
      }),
      timeFormatCode: Joi.number().min(1).max(2).required().messages({
        "number.base": "Time Format Code should be selected",
        "number.empty": "Time Format Code should not be empty",
        "number.min": `Time Format Code should be greater than or equal to {#limit}`,
        "number.max": `Time Format Code should be less than or equal to {#limit}`,
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
