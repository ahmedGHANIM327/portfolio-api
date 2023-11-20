const Joi = require('joi');
const { path } = require('ramda');

const interestsValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  photo: Joi.string()
});

const validateInterestsData = (data) => {
  const { error } = interestsValidationSchema.validate(data);

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

module.exports = validateInterestsData;
