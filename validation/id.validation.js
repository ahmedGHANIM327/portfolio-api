const Joi = require('joi');
const { path } = require('ramda');

const idValidationSchema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/);

const validateId = (id) => {
  const { error } = idValidationSchema.validate(id);
  if (error) throw new Error(path(['details', 0, 'message'], error));
};

module.exports = validateId;
