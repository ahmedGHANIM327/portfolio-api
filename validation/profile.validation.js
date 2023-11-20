const Joi = require('joi');
const { path } = require('ramda');

const profileValidationSchema = Joi.object({
  fullName: Joi.string().required(),
  gender: Joi.string().valid('Male', 'Female').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  dateOfBirth: Joi.date(),
  address: Joi.string(),
  currentPosition: Joi.string(),
  label: Joi.string(),
  cv: Joi.string(),
  photo: Joi.string(),
  nationality: Joi.string()
});

const validateProfileData = (data) => {
  const { error } = profileValidationSchema.validate(data);

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

module.exports = validateProfileData;
