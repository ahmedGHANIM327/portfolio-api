const Project = require('../models/projects');
const fileStorageService = require('./filestorage');
const { prop } = require('ramda');

const projectsService = (() => {
  const addOne = async (data) => {
    const project = new Project(data);
    return await project.save();
  };

  const getById = async (id) => {
    const project = await Project.findById(id);
    return project;
  };

  const getAll = async () => {
    const projects = await Project.find();
    return projects;
  };

  const updateOne = async (id, updatedData) => {
    const project = await Project.findByIdAndUpdate(id, updatedData, { new: true });
    return project;
  };

  const delOne = async (id) => {
    const project = await Project.findByIdAndDelete(id);
    return project;
  };

  const delFiles = async (id, fileType) => {
    const project = await Project.findById(id);
    for (const type of fileType) {
      if (prop(type, project)) {
        const result = await fileStorageService.deleteFile(prop(type, project));
        if (prop('error', result)) throw new Error(prop('error', result));
      }
    }
  };

  return {
    addOne,
    getById,
    getAll,
    updateOne,
    delOne,
    delFiles
  };
})();

module.exports = projectsService;
