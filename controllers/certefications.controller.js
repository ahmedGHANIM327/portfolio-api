const certeficationsService = require('../services/certefications.service');
const fileStorageService = require('../services/filestorage');
const { prop, compose, omit, path } = require('ramda');
const { isNotUndefined } = require('ramda-adjunct');
const {
  validateCerteficationsData,
  validateId,
  validateFile
} = require('../validation');
const {
  getFileAccessLink,
  getFilesAccessLinks
} = require('../util/transformations');

const certeficationsController = (() => {
  const addOne = async (req, res) => {
    const data = compose(
      omit(['file']),
      prop('body')
    )(req);

    // Validate data getting from request
    validateCerteficationsData(data);

    // Get file from request
    const file = prop('file', req);

    // if file exists
    if (isNotUndefined(file)) {
      // Validate File
      validateFile(['pdf', 'png', 'jpg', 'jpeg'], file);

      // Store file to storage
      const resultStorage = await fileStorageService.saveFile('certefications', file);

      // verify file is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      data.file = prop('fileName', resultStorage);
    }

    // Add data to db
    await certeficationsService.addOne(data);

    res.status(200).json({ ok: true, success: 'CERTEFICATION_CREATED_SUCCESSFULY' });
  };

  const getById = async (req, res) => {
    // Get & validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // get data and verify if it exists
    const certefication = await certeficationsService.getById(id);
    if (!certefication) throw new Error('CERTEFICATION_NOT_FOUND');

    await getFileAccessLink(certefication, ['file']);

    res.status(200).json({ ok: true, data: certefication });
  };

  const getAll = async (req, res) => {
    // get data and verify if it exists
    const certefications = await certeficationsService.getAll();
    if (!certefications) throw new Error('NO_CERTEFICATION_FOUND');

    await getFilesAccessLinks(certefications, ['file']);

    res.status(200).json({ ok: true, data: certefications });
  };

  const updateOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // validate updated data
    const updatedData = prop('body', req);

    // Validate updatedData getting from request
    validateCerteficationsData(updatedData);

    // Get file from request
    const file = prop('file', req);

    // if file exists
    if (isNotUndefined(file)) {
      // Validate File
      validateFile(['pdf', 'png', 'jpg', 'jpeg'], file);

      // Store file to storage
      const resultStorage = await fileStorageService.saveFile('certefications', file);

      // verify file is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      updatedData.file = prop('fileName', resultStorage);
    } else {
      updatedData.file = null;
    }

    // Del old file
    await certeficationsService.delFiles(id, ['file']);

    // Add data to db
    await certeficationsService.updateOne(id, updatedData);

    res.status(200).json({ ok: true, success: 'CERTEFICATION_UPDATED_SUCCESSFULY' });
  };

  const delOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // Del related file
    await certeficationsService.delFiles(id, ['file']);

    // Del certefication
    await certeficationsService.delOne(id);

    res.status(200).json({ ok: true, success: 'CERTEFICATION_DELETED_SUCCESSFULY' });
  };

  return {
    addOne,
    getById,
    getAll,
    updateOne,
    delOne
  };
})();

module.exports = certeficationsController;
