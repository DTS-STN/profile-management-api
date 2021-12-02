const Joi = require("joi");

const createUserInfo = {
  body: Joi.object().keys({
    userInfo: Joi.array()
      .items(
        Joi.object().keys({
          firstName: Joi.string().required().min(1).max(150),
          middleName: Joi.string(),
          lastName: Joi.string().required(),
          dob: Joi.date().required(),
          sinNumber: Joi.number().min(9).required(),
          maritalStatusCode: Joi.number().min(1).max(10).required(),
        })
      )
      .required(),
    userContact: Joi.array()
      .items(
        Joi.object().keys({
          phone: Joi.string().length(10).required(),
          email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        })
      )
      .required(),
  }),
};

const getUserInfo = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
};

const updateUserInfo = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string().required(),
      middleName: Joi.string().required(),
      lastName: Joi.string().required(),
      dob: Joi.date().required(),
      sinNumber: Joi.number().min(9).required(),
      maritalStatusCode: Joi.number().min(1).max(10).required(),
    })
    .min(1),
};

module.exports = {
  createUserInfo,
  getUserInfo,
  updateUserInfo,
};
