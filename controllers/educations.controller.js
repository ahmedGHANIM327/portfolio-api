const educationsService = require('../services/educations.service');
const fileStorageService = require('../services/filestorage');
const { prop, path } = require('ramda');
const { isNotUndefined } = require('ramda-adjunct');
const {
  validateEducationsData,
  validateFile,
  validateId
} = require('../validation');
const {
  getFileAccessLink,
  getFilesAccessLinks
} = require('../util/transformations');

const educationsController = (() => {
  const addOne = async (req, res) => {
    const data = prop('body', req);

    // Validate data getting from request
    validateEducationsData(data);

    // Get file from request
    const diploma = prop('file', req);

    // if diploma exists
    if (isNotUndefined(diploma)) {
      // Validate diploma
      validateFile(['pdf'], diploma);

      // Store diploma to storage
      const resultStorage = await fileStorageService.saveFile('educations', diploma);

      // verify diploma is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      data.diploma = prop('fileName', resultStorage);
    }

    // Add data to db
    await educationsService.addOne(data);

    res.status(200).json({ ok: true, success: 'EDUCATION_CREATED_SUCCESSFULY' });
  };

  const getById = async (req, res) => {
    // Get & validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // get data and verify if it exists
    const education = await educationsService.getById(id);
    if (!education) throw new Error('EDUCATION_NOT_FOUND');

    await getFileAccessLink(education, ['diploma']);

    res.status(200).json({ ok: true, data: education });
  };

  const getAll = async (req, res) => {
    // get data and verify if it exists
    const educations = await educationsService.getAll();
    if (!educations) throw new Error('NO_EDUCATION_FOUND');

    await getFilesAccessLinks(educations, ['diploma']);

    res.status(200).json({ ok: true, data: educations });
  };

  const updateOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // validate updated data
    const updatedData = prop('body', req);

    // Validate updatedData getting from request
    validateEducationsData(updatedData);

    // Get file from request
    const diploma = prop('file', req);

    // if file exists
    if (isNotUndefined(diploma)) {
      // Validate File
      validateFile(['pdf'], diploma);

      // Store file to storage
      const resultStorage = await fileStorageService.saveFile('educations', diploma);

      // verify file is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      updatedData.diploma = prop('fileName', resultStorage);
    } else {
      updatedData.diploma = null;
    }

    // Del old file
    await educationsService.delFiles(id, ['diploma']);

    // Add data to db
    await educationsService.updateOne(id, updatedData);

    res.status(200).json({ ok: true, success: 'EDUCATION_UPDATED_SUCCESSFULY' });
  };

  const delOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // Del related file
    await educationsService.delFiles(id, ['diploma']);

    // Del certefication
    await educationsService.delOne(id);

    res.status(200).json({ ok: true, success: 'EDUCATION_DELETED_SUCCESSFULY' });
  };

  return {
    addOne,
    getById,
    getAll,
    updateOne,
    delOne
  };
})();

module.exports = educationsController;
