const Joi = require('joi');
const JoiObjectId = require('joi-objectid')(Joi);
const { path } = require('ramda');

const idValidationSchema = Joi.object({
  id: JoiObjectId().required()
});

const validateId = (id) => {
  const { error } = idValidationSchema.validate({ id });

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

module.exports = validateId;
