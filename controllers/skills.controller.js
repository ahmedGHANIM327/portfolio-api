const skillsService = require('../services/skills.service');
const fileStorageService = require('../services/filestorage');
const { prop, path } = require('ramda');
const { isNotUndefined } = require('ramda-adjunct');
const {
  validateSkillsData,
  validateFile,
  validateId
} = require('../validation');
const {
  getFileAccessLink,
  getFilesAccessLinks
} = require('../util/transformations');

const skillsController = (() => {
  const addOne = async (req, res) => {
    const data = prop('body', req);

    // Validate data getting from request
    validateSkillsData(data);

    // Get file from request
    const icon = prop('file', req);

    // if icon exists
    if (isNotUndefined(icon)) {
      // Validate icon
      validateFile(['png', 'jpg', 'jpeg'], icon);

      // Store icon to storage
      const resultStorage = await fileStorageService.saveFile('skills', icon);

      // verify icon is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      data.icon = prop('fileName', resultStorage);
    }

    // Add data to db
    await skillsService.addOne(data);

    res.status(200).json({ ok: true, success: 'SKILL_CREATED_SUCCESSFULY' });
  };

  const getById = async (req, res) => {
    // Get & validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // get data and verify if it exists
    const skill = await skillsService.getById(id);
    if (!skill) throw new Error('SKILL_NOT_FOUND');

    await getFileAccessLink(skill, ['icon']);

    res.status(200).json({ ok: true, data: skill });
  };

  const getAll = async (req, res) => {
    // get data and verify if it exists
    const skills = await skillsService.getAll();
    if (!skills) throw new Error('NO_SKILL_FOUND');

    await getFilesAccessLinks(skills, ['icon']);

    res.status(200).json({ ok: true, data: skills });
  };

  const updateOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // validate updated data
    const updatedData = prop('body', req);

    // Validate updatedData getting from request
    validateSkillsData(updatedData);

    // Get file from request
    const icon = prop('file', req);

    // if file exists
    if (isNotUndefined(icon)) {
      // Validate File
      validateFile(['png', 'jpg', 'jpeg'], icon);

      // Store file to storage
      const resultStorage = await fileStorageService.saveFile('skills', icon);

      // verify file is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      updatedData.icon = prop('fileName', resultStorage);
    } else {
      updatedData.icon = null;
    }

    // Del old file
    await skillsService.delFiles(id, ['icon']);

    // Add data to db
    await skillsService.updateOne(id, updatedData);

    res.status(200).json({ ok: true, success: 'SKILL_UPDATED_SUCCESSFULY' });
  };

  const delOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // Del related file
    await skillsService.delFiles(id, ['icon']);

    // Del certefication
    await skillsService.delOne(id);

    res.status(200).json({ ok: true, success: 'SKILL_DELETED_SUCCESSFULY' });
  };

  return {
    addOne,
    getById,
    getAll,
    updateOne,
    delOne
  };
})();

module.exports = skillsController;
