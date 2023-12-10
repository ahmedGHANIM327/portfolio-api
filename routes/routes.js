const express = require('express');
const certeficationsRouter = require('./certefications.routes');
const educationsRouter = require('./educations.routes');
const experiencesRouter = require('./experiences.routes');
const interestsRouter = require('./interests.routes');
const languagesRouter = require('./languages.routes');
const linksRouter = require('./links.routes');
const skillsRouter = require('./skills.routes');
const projectsRouter = require('./projects.routes');
const profileRouter = require('./profile.routes');
const handleError = require('../middleware/errorHandler.middleware');

module.exports = function (app) {
  app.use(express.json());
  app.use('/certefications', certeficationsRouter);
  app.use('/educations', educationsRouter);
  app.use('/experiences', experiencesRouter);
  app.use('/interests', interestsRouter);
  app.use('/languages', languagesRouter);
  app.use('/links', linksRouter);
  app.use('/skills', skillsRouter);
  app.use('/projects', projectsRouter);
  app.use('/profile', profileRouter);
  app.use(handleError);
};
