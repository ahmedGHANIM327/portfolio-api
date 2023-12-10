const Skill = require('../models/skills');
const fileStorageService = require('./filestorage');
const { prop } = require('ramda');

const skillsService = (() => {
  const addOne = async (data) => {
    const skill = new Skill(data);
    return await skill.save();
  };

  const getById = async (id) => {
    const skill = await Skill.findById(id);
    return skill;
  };

  const getAll = async () => {
    const skills = await Skill.find();
    return skills;
  };

  const updateOne = async (id, updatedData) => {
    const skill = await Skill.findByIdAndUpdate(id, updatedData, { new: true });
    return skill;
  };

  const delOne = async (id) => {
    const skill = await Skill.findByIdAndDelete(id);
    return skill;
  };

  const delFiles = async (id, fileType) => {
    const skill = await Skill.findById(id);
    for (const type of fileType) {
      if (prop(type, skill)) {
        const result = await fileStorageService.deleteFile(prop(type, skill));
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

module.exports = skillsService;
