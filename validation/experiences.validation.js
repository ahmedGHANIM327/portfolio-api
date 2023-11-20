const Joi = require('joi');
const { path } = require('ramda');

const experiencesValidationSchema = Joi.object({
  jobTitle: Joi.string().required(),
  jobType: Joi.string().required(),
  company: Joi.object({
    name: Joi.string().required(),
    address: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    website: Joi.string()
  }).required(),
  jobLocation: Joi.string().required(),
  isCurrentPosition: Joi.boolean().default(false),
  startDate: Joi.date().required(),
  endDate: Joi.date(),
  sector: Joi.string(),
  description: Joi.string(),
  achievements: Joi.array().items(Joi.string()),
  skillsAcquired: Joi.array().items(Joi.string()),
  jobRelatedDocuments: Joi.array().items(Joi.string()),
  projectLink: Joi.string()
});

const validateExperiencesData = (data) => {
  const { error } = experiencesValidationSchema.validate(data);

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

module.exports = validateExperiencesData;
