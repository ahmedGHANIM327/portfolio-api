const interestsService = require('../services/interests.service');
const fileStorageService = require('../services/filestorage');
const { prop, path } = require('ramda');
const { isNotUndefined } = require('ramda-adjunct');
const {
  validateInterestsData,
  validateFile,
  validateId
} = require('../validation');
const {
  getFileAccessLink,
  getFilesAccessLinks
} = require('../util/transformations');

const interestsController = (() => {
  const addOne = async (req, res) => {
    const data = prop('body', req);

    // Validate data getting from request
    validateInterestsData(data);

    // Get file from request
    const photo = prop('file', req);

    // if photo exists
    if (isNotUndefined(photo)) {
      // Validate photo
      validateFile(['png', 'jpg', 'jpeg'], photo);

      // Store photo to storage
      const resultStorage = await fileStorageService.saveFile('interests', photo);

      // verify photo is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      data.photo = prop('fileName', resultStorage);
    }

    // Add data to db
    await interestsService.addOne(data);

    res.status(200).json({ ok: true, success: 'INTEREST_CREATED_SUCCESSFULY' });
  };

  const getById = async (req, res) => {
    // Get & validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // get data and verify if it exists
    const interest = await interestsService.getById(id);
    if (!interest) throw new Error('INTEREST_NOT_FOUND');

    await getFileAccessLink(interest, ['photo']);

    res.status(200).json({ ok: true, data: interest });
  };

  const getAll = async (req, res) => {
    // get data and verify if it exists
    const interests = await interestsService.getAll();
    if (!interests) throw new Error('NO_INTEREST_FOUND');

    await getFilesAccessLinks(interests, ['photo']);

    res.status(200).json({ ok: true, data: interests });
  };

  const updateOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // validate updated data
    const updatedData = prop('body', req);

    // Validate updatedData getting from request
    validateInterestsData(updatedData);

    // Get file from request
    const photo = prop('file', req);

    // if file exists
    if (isNotUndefined(photo)) {
      // Validate File
      validateFile(['png', 'jpg', 'jpeg'], photo);

      // Store file to storage
      const resultStorage = await fileStorageService.saveFile('interests', photo);

      // verify file is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      updatedData.photo = prop('fileName', resultStorage);
    } else {
      updatedData.photo = null;
    }

    // Del old file
    await interestsService.delFiles(id, ['photo']);

    // Add data to db
    await interestsService.updateOne(id, updatedData);

    res.status(200).json({ ok: true, success: 'INTEREST_UPDATED_SUCCESSFULY' });
  };

  const delOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // Del related file
    await interestsService.delFiles(id, ['photo']);

    // Del interest
    await interestsService.delOne(id);

    res.status(200).json({ ok: true, success: 'INTEREST_DELETED_SUCCESSFULY' });
  };

  return {
    addOne,
    getById,
    getAll,
    updateOne,
    delOne
  };
})();

module.exports = interestsController;
