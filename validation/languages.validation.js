const Joi = require('joi');
const { path } = require('ramda');

const languagesValidationSchema = Joi.object({
  language: Joi.string().required(),
  level: Joi.string().required()
});

const validateLanguagesData = (data) => {
  const { error } = languagesValidationSchema.validate(data);

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

module.exports = validateLanguagesData;
