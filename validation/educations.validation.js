const Joi = require('joi');
const { path } = require('ramda');

const educationsValidationSchema = Joi.object({
  school: Joi.string().required(),
  degree: Joi.string().required(),
  fieldOfStudy: Joi.string().required(),
  location: Joi.string().required(),
  startDate: Joi.date().required(),
  expectedEndDate: Joi.date(),
  description: Joi.string(),
  achievements: Joi.array().items(Joi.string()),
  skills: Joi.array().items(Joi.string()),
  diploma: Joi.string()
});

const validateEducationsData = (data) => {
  const { error } = educationsValidationSchema.validate(data);

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

module.exports = validateEducationsData;
