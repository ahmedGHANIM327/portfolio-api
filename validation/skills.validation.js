const Joi = require('joi');
const { path } = require('ramda');

const skillsValidationSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  level: Joi.string().required(),
  description: Joi.string()
});

const validateSkillsData = (data) => {
  const { error } = skillsValidationSchema.validate(data);

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

module.exports = validateSkillsData;
