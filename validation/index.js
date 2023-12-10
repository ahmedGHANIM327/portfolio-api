const validateCerteficationsData = require('./certefications.validation');
const validateEducationsData = require('./educations.validation');
const validateExperiencesData = require('./experiences.validation');
const validateId = require('./id.validation');
const validateInterestsData = require('./interests.validation');
const validateLanguagesData = require('./languages.validation');
const validateLinksData = require('./links.validation');
const validateProfileData = require('./profile.validation');
const validateProjectsData = require('./projects.validation');
const validateSkillsData = require('./skills.validation');
const {
  validateUserData,
  validateUserEmail,
  validateUserPassword,
  validateUserName
} = require('./users.validation');
const validateFile = require('./filestorage.validation');

module.exports = {
  validateCerteficationsData,
  validateEducationsData,
  validateExperiencesData,
  validateId,
  validateInterestsData,
  validateLanguagesData,
  validateLinksData,
  validateProfileData,
  validateProjectsData,
  validateSkillsData,
  validateUserData,
  validateUserEmail,
  validateUserName,
  validateUserPassword,
  validateFile
};
