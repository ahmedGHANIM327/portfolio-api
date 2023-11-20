const Joi = require('joi');
const { path } = require('ramda');

const certeficationsValidationSchema = Joi.object({
  name: Joi.string().required(),
  organization: Joi.string().required(),
  dateOfIssue: Joi.date().required(),
  expiryDate: Joi.date(),
  file: Joi.string(),
  website: Joi.string(),
  description: Joi.string()
});

const validateCerteficationsData = (data) => {
  const { error } = certeficationsValidationSchema.validate(data);

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

module.exports = validateCerteficationsData;
