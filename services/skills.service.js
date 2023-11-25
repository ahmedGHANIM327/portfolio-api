const Skill = require('../models/skills');

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
    const skill = await Skill.findByIdAndRemove(id);
    return skill;
  };

  const delMany = async (ids) => {
    const skills = await Skill.deleteMany({ _id: { $in: ids } });
    return skills;
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

module.exports = skillsService;
