const linksService = require('../services/links.service');
const { prop, path } = require('ramda');
const {
  validateLinksData,
  validateId
} = require('../validation');

const linksController = (() => {
  const addOne = async (req, res) => {
    const data = prop('body', req);

    // Validate data getting from request
    validateLinksData(data);

    // Add data to db
    await linksService.addOne(data);

    res.status(200).json({ ok: true, success: 'LINK_CREATED_SUCCESSFULY' });
  };

  const getById = async (req, res) => {
    // Get & validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // get data and verify if it exists
    const link = await linksService.getById(id);
    if (!link) throw new Error('LINK_NOT_FOUND');

    res.status(200).json({ ok: true, data: link });
  };

  const getAll = async (req, res) => {
    // get data and verify if it exists
    const links = await linksService.getAll();
    if (!links) throw new Error('NO_LINK_FOUND');

    res.status(200).json({ ok: true, data: links });
  };

  const updateOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // validate updated data
    const updatedData = prop('body', req);

    // Validate updatedData getting from request
    validateLinksData(updatedData);

    // Add data to db
    await linksService.updateOne(id, updatedData);

    res.status(200).json({ ok: true, success: 'LINK_UPDATED_SUCCESSFULY' });
  };

  const delOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // Del
    await linksService.delOne(id);

    res.status(200).json({ ok: true, success: 'LINK_DELETED_SUCCESSFULY' });
  };

  return {
    addOne,
    getById,
    getAll,
    updateOne,
    delOne
  };
})();

module.exports = linksController;
