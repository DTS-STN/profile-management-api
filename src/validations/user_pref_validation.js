const Joi = require("joi");

const createUserPref = {
  body: Joi.object().keys({
    params: Joi.object().keys({
      id: Joi.required(),
    }),
    userPref: Joi.array()
      .items(
        Joi.object().keys({
          webLanguageCode: Joi.number().min(1).required(),
          correspondenceLanguageCode: Joi.number().min(1).required(),
          brailleTtyKeyboard: Joi.boolean().required(),
          preferredCurrencyCode: Joi.number().min(1).required(),
          timeZoneCode: Joi.number().min(1).required(),
          timeFormatCode: Joi.number().min(1).required(),
        })
      )
      .required(),
  }),
};

const getUserPref = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
};

const updateUserPref = {
  body: Joi.object()
    .keys({
      params: Joi.object().keys({
        id: Joi.required(),
      }),
      userPref: Joi.array()
        .items(
          Joi.object().keys({
            webLanguageCode: Joi.number().min(1).required(),
            correspondenceLanguageCode: Joi.number().min(1).required(),
            brailleTtyKeyboard: Joi.boolean().required(),
            preferredCurrencyCode: Joi.number().min(1).required(),
            timeZoneCode: Joi.number().min(1).required(),
            timeFormatCode: Joi.number().min(1).required(),
          })
        )
        .required(),
    })
    .min(1),
};

module.exports = {
  createUserPref,
  updateUserPref,
  getUserPref,
};
