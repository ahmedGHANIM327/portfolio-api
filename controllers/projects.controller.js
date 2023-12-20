const projectsService = require('../services/projects.service');
const fileStorageService = require('../services/filestorage');
const { prop, path } = require('ramda');
const { isNotUndefined } = require('ramda-adjunct');
const {
  validateProjectsData,
  validateFile,
  validateId
} = require('../validation');
const {
  getFileAccessLink,
  getFilesAccessLinks
} = require('../util/transformations');

const projectsController = (() => {
  const addOne = async (req, res) => {
    const data = prop('body', req);

    // Validate data getting from request
    validateProjectsData(data);

    const user = prop('currentUser', req);

    data.user = user;

    // Get file from request
    const image = prop('file', req);

    // if image exists
    if (isNotUndefined(image)) {
      // Validate image
      validateFile(['png', 'jpg', 'jpeg'], image);

      // Store image to storage
      const resultStorage = await fileStorageService.saveFile('projects', image, user);

      // verify image is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      data.image = prop('fileName', resultStorage);
    }

    // Add data to db
    await projectsService.addOne(data);

    res.status(200).json({ ok: true, success: 'PROJECT_CREATED_SUCCESSFULY' });
  };

  const getById = async (req, res) => {
    // Get & validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // get data and verify if it exists
    const project = await projectsService.getById(id);
    if (!project) throw new Error('PROJECT_NOT_FOUND');

    await getFileAccessLink(project, ['image']);

    res.status(200).json({ ok: true, data: project });
  };

  const getUserProjects = async (req, res) => {
    const userId = prop('currentUser', req);

    validateId(userId);

    // get data and verify if it exists
    const projects = await projectsService.getUserProjects(userId);
    if (!projects) throw new Error('NO_PROJECT_FOUND');

    await getFilesAccessLinks(projects, ['image']);

    res.status(200).json({ ok: true, data: projects });
  };

  const getAll = async (req, res) => {
    // get data and verify if it exists
    const projects = await projectsService.getAll();
    if (!projects) throw new Error('NO_PROJECT_FOUND');

    await getFilesAccessLinks(projects, ['image']);

    res.status(200).json({ ok: true, data: projects });
  };

  const updateOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // validate updated data
    const updatedData = prop('body', req);

    // Validate updatedData getting from request
    validateProjectsData(updatedData);

    const user = prop('currentUser', req);

    // Get file from request
    const image = prop('file', req);

    // if file exists
    if (isNotUndefined(image)) {
      // Validate File
      validateFile(['png', 'jpg', 'jpeg'], image);

      // Store file to storage
      const resultStorage = await fileStorageService.saveFile('projects', image, user);

      // verify file is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      updatedData.image = prop('fileName', resultStorage);

      // Del old file
      await projectsService.delFiles(id, ['image']);
    }

    // Add data to db
    await projectsService.updateOne(id, updatedData);

    res.status(200).json({ ok: true, success: 'PROJECT_UPDATED_SUCCESSFULY' });
  };

  const delOne = async (req, res) => {
    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // Del related file
    await projectsService.delFiles(id, ['image']);

    // Del certefication
    await projectsService.delOne(id);

    res.status(200).json({ ok: true, success: 'PROJECT_DELETED_SUCCESSFULY' });
  };

  return {
    addOne,
    getById,
    getAll,
    updateOne,
    delOne,
    getUserProjects
  };
})();

module.exports = projectsController;
