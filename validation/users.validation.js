const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const { path } = require('ramda');

// For password validation
const complexityOptions = {
  min: 8, // Minimum password length
  max: 30, // Maximum password length
  lowerCase: 1, // Require at least 1 lowercase letter
  upperCase: 1, // Require at least 1 uppercase letter
  numeric: 1, // Require at least 1 digit
  symbol: 1, // Require at least 1 special character
  requirementCount: 4 // Total number of requirements above that must be met
};

const userSchema = Joi.object({
  fullName: Joi.string().regex(/^[a-zA-Z\s]*$/).min(5).required(),
  email: Joi.string().email().required(),
  password: passwordComplexity(complexityOptions).required()
});

const userNameSchema = Joi.object({
  fullName: Joi.string().regex(/^[a-zA-Z\s]*$/).min(5).required()
});

const userPasswordSchema = Joi.object({
  password: passwordComplexity(complexityOptions).required()
});

const userEmailSchema = Joi.object({
  email: Joi.string().email().required()
});

const userStatusSchema = Joi.object({
  status: Joi.string().valid('WAITING', 'ACTIVE', 'BLOCKED').required()
});

const validateUserData = (data) => {
  const { error } = userSchema.validate(data);

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

const validateUserName = (fullName) => {
  const { error } = userNameSchema.validate({ fullName });

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

const validateUserEmail = (email) => {
  const { error } = userEmailSchema.validate({ email });

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

const validateUserPassword = (password) => {
  const { error } = userPasswordSchema.validate({ password });

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

const validateUserStatus = (status) => {
  const { error } = userStatusSchema.validate({ status });

  if (error) {
    throw new Error(path(['details', 0, 'message'], error));
  }
};

module.exports = {
  validateUserData,
  validateUserName,
  validateUserEmail,
  validateUserPassword,
  validateUserStatus
};
