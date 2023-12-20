const experiencesService = require('../services/experiences.service');
const { prop, path } = require('ramda');
const {
  validateExperiencesData,
  validateId
} = require('../validation');

const experiencesController = (() => {
  const addOne = async (req, res) => {
    const data = prop('body', req);

    // Validate data getting from request
    validateExperiencesData(data);

    const user = prop('currentUser', req);

    data.user = user;

    // Add data to db
    await experiencesService.addOne(data);

    res.status(200).json({ ok: true, success: 'EXPERIENCE_CREATED_SUCCESSFULY' });
  };

  const getById = async (req, res) => {
    // Get & validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // get data and verify if it exists
    const experience = await experiencesService.getById(id);
    if (!experience) throw new Error('EXPERIENCE_NOT_FOUND');

    res.status(200).json({ ok: true, data: experience });
  };

  const getUserExperiences = async (req, res) => {
    // Get & validate user Id
    const userId = prop('currentUser', req);

    validateId(userId);

    // get data and verify if it exists
    const experiences = await experiencesService.getUserExperiences(userId);
    if (!experiences) throw new Error('NO_EXPERIENCE_FOUND');

    res.status(200).json({ ok: true, data: experiences });
  };

  const getAll = async (req, res) => {
    // get data and verify if it exists
    const experiences = await experiencesService.getAll();
    if (!experiences) throw new Error('NO_EXPERIENCE_FOUND');

    res.status(200).json({ ok: true, data: experiences });
  };

  const updateOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // validate updated data
    const updatedData = prop('body', req);

    // Validate updatedData getting from request
    validateExperiencesData(updatedData);

    // Add data to db
    await experiencesService.updateOne(id, updatedData);

    res.status(200).json({ ok: true, success: 'EXPERIENCE_UPDATED_SUCCESSFULY' });
  };

  const delOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // Del experience
    await experiencesService.delOne(id);

    res.status(200).json({ ok: true, success: 'EXPERIENCE_DELETED_SUCCESSFULY' });
  };

  return {
    addOne,
    getById,
    getAll,
    updateOne,
    delOne,
    getUserExperiences
  };
})();

module.exports = experiencesController;
