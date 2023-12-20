const languagesService = require('../services/languages.service');
const { prop, path } = require('ramda');
const {
  validateLanguagesData,
  validateId
} = require('../validation');

const languagesController = (() => {
  const addOne = async (req, res) => {
    const data = prop('body', req);

    // Validate data getting from request
    validateLanguagesData(data);

    const user = prop('currentUser', req);

    data.user = user;

    // Add data to db
    await languagesService.addOne(data);

    res.status(200).json({ ok: true, success: 'LANGUAGE_CREATED_SUCCESSFULY' });
  };

  const getById = async (req, res) => {
    // Get & validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // get data and verify if it exists
    const language = await languagesService.getById(id);
    if (!language) throw new Error('LANGUAGE_NOT_FOUND');

    res.status(200).json({ ok: true, data: language });
  };

  const getUserLanguages = async (req, res) => {
    const userId = prop('currentUser', req);

    validateId(userId);

    // get data and verify if it exists
    const languages = await languagesService.getUserLanguages(userId);
    if (!languages) throw new Error('NO_LANGUAGE_FOUND');

    res.status(200).json({ ok: true, data: languages });
  };

  const getAll = async (req, res) => {
    // get data and verify if it exists
    const languages = await languagesService.getAll();
    if (!languages) throw new Error('NO_LANGUAGE_FOUND');

    res.status(200).json({ ok: true, data: languages });
  };

  const updateOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // validate updated data
    const updatedData = prop('body', req);

    // Validate updatedData getting from request
    validateLanguagesData(updatedData);

    // Add data to db
    await languagesService.updateOne(id, updatedData);

    res.status(200).json({ ok: true, success: 'LANGUAGE_UPDATED_SUCCESSFULY' });
  };

  const delOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // Del
    await languagesService.delOne(id);

    res.status(200).json({ ok: true, success: 'LANGUAGE_DELETED_SUCCESSFULY' });
  };

  return {
    addOne,
    getById,
    getAll,
    updateOne,
    delOne,
    getUserLanguages
  };
})();

module.exports = languagesController;
