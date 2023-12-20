const Joi = require('joi');
const { path } = require('ramda');

const apikeyLabelSchema = Joi.object({
  label: Joi.string().regex(/^[a-zA-Z\s]*$/).min(5).required()
});

const validateApiKeyLabel = (label) => {
  const { error } = apikeyLabelSchema.validate({ label });

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

module.exports = {
  validateApiKeyLabel
};
