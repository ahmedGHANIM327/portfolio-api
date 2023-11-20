const Joi = require('joi');
const { path } = require('ramda');

const linksValidationSchema = Joi.object({
  type: Joi.string().required(),
  link: Joi.string().required()
});

const validateLinksData = (data) => {
  const { error } = linksValidationSchema.validate(data);

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

module.exports = validateLinksData;
