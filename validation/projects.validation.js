const Joi = require('joi');
const { path } = require('ramda');

const linkValidationSchema = Joi.object({
  type: Joi.string().required(),
  link: Joi.string().required()
});

const contributorValidationSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  linkedin: Joi.string(),
  website: Joi.string()
});

const projectsValidationSchema = Joi.object({
  projectName: Joi.string().required(),
  image: Joi.string(),
  links: Joi.array().items(linkValidationSchema),
  categories: Joi.string(),
  startDate: Joi.date().required(),
  endDate: Joi.date(),
  currentlyWorkingOn: Joi.boolean().default(false),
  projectDescription: Joi.string(),
  toolsUsed: Joi.array().items(Joi.string()),
  contributors: Joi.array().items(contributorValidationSchema),
  customer: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    website: Joi.string()
  })
});

const validateProjectsData = (data) => {
  const { error } = projectsValidationSchema.validate(data);

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

module.exports = validateProjectsData;
