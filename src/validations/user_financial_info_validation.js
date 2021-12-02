const Joi = require("joi");

const getUserAccount = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
};

const updateUserAccount = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      bankCode: Joi.string()
        .length(3)
        .pattern(/^[0-9]+$/)
        .required(),
      transitNumber: Joi.number().min(5).max(5).required(),
      accountNumber: Joi.number().min(9).max(13).required(),
    })
    .min(1),
};

const createUserAccount = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object().keys({
    bankCode: Joi.string()
      .length(3)
      .pattern(/^[0-9]+$/)
      .required(),
    transitNumber: Joi.number().min(5).max(5).required(),
    accountNumber: Joi.number().min(9).max(13).required(),
  }),
};

module.exports = {
  createUserAccount,
  getUserAccount,
  updateUserAccount,
};
