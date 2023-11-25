const Project = require('../models/projects');

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
    const project = await Project.findByIdAndRemove(id);
    return project;
  };

  const delMany = async (ids) => {
    const projects = await Project.deleteMany({ _id: { $in: ids } });
    return projects;
  };

  return {
    addOne,
    getById,
    getAll,
    updateOne,
    delOne,
    delMany
  };
})();

module.exports = projectsService;
