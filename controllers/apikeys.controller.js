const apikeysService = require('../services/apikeys.service');
const { generateApiKey } = require('../util/apikeys');
const { prop, path } = require('ramda');
const {
  validateId,
  validateApiKeyLabel
} = require('../validation');

const experiencesController = (() => {
  const addOne = async (req, res) => {
    const label = path(['body', 'label'], req);

    // Validate label
    validateApiKeyLabel(label);

    const user = prop('currentUser', req);
    const key = generateApiKey();

    const data = {
      user,
      key,
      label
    };

    // Add data to db
    await apikeysService.addOne(data);

    res.status(200).json({ ok: true, success: 'API_KEY_CREATED_SUCCESSFULY' });
  };

  const getById = async (req, res) => {
    // Get & validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // get data and verify if it exists
    const apikey = await apikeysService.getById(id);
    if (!apikey) throw new Error('API_KEY_NOT_FOUND');

    res.status(200).json({ ok: true, data: apikey });
  };

  const getUserApiKeys = async (req, res) => {
    // Get & validate Id
    const userId = prop('currentUser', req);

    validateId(userId);

    // get data and verify if it exists
    const apikeys = await apikeysService.getUserKeys(userId);
    if (!apikeys) throw new Error('NO_API_KEY_FOUND');

    res.status(200).json({ ok: true, data: apikeys });
  };

  const getAll = async (req, res) => {
    // get data and verify if it exists
    const apikeys = await apikeysService.getAll();
    if (!apikeys) throw new Error('NO_API_KEY_FOUND');

    res.status(200).json({ ok: true, data: apikeys });
  };

  const updateOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // validate updated data
    const updatedData = prop('body', req);

    // Validate updatedData getting from request
    validateApiKeyLabel(prop('label', updatedData));

    // Add data to db
    const updatedApiKey = await apikeysService.updateOne(id, updatedData);
    if (!updatedApiKey) throw new Error('API_KEY_NOT_FOUND');

    res.status(200).json({ ok: true, success: 'API_KEY_UPDATED_SUCCESSFULY' });
  };

  const delOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // Del experience
    await apikeysService.delOne(id);

    res.status(200).json({ ok: true, success: 'API_KEY_DELETED_SUCCESSFULY' });
  };

  return {
    addOne,
    getById,
    getUserApiKeys,
    getAll,
    updateOne,
    delOne
  };
})();

module.exports = experiencesController;
