const baseJoi = require("joi");
const Joi = baseJoi.extend(require("joi-postalcode"));

const createUserContact = {
  body: Joi.object().keys({
    userAddress: Joi.array()
      .items(
        Joi.object().keys({
          addressTypeCode: Joi.number().required().min(1).max(2),
          aptNumber: Joi.number().integer().min(1).max(9999999999).required(),
          streetNumber: Joi.number()
            .integer()
            .min(1)
            .max(9999999999)
            .required(),
          streetName: Joi.string().required().min(1).max(50),
          city: Joi.string().required().min(1).max(50),
          postalCode: Joi.string().postalCode("CA").required(),
          countryCode: Joi.string().min(1).max(2).required(),
        })
      )
      .required()
      .min(1),
  }),
};

const updateUserContact = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      userAddress: Joi.array()
        .items(
          Joi.object().keys({
            addressTypeCode: Joi.number().required().min(1).max(2),
            aptNumber: Joi.number().integer().min(1).max(9999999999).required(),
            streetNumber: Joi.number()
              .integer()
              .min(1)
              .max(9999999999)
              .required(),
            streetName: Joi.string().required().min(1).max(50),
            city: Joi.string().required().min(1).max(50),
            postalCode: Joi.string().postalCode("CA").required(),
            countryCode: Joi.string().min(1).max(2).required(),
          })
        )
        .required()
        .min(1)
        .max(2),
      userContact: Joi.array()
        .items(
          Joi.object().keys({
            phone: Joi.string()
              .length(10)
              .pattern(/^[0-9]+$/)
              .required(),
            email: Joi.string()
              .email({ tlds: { allow: false } })
              .required(),
          })
        )
        .required(),
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
