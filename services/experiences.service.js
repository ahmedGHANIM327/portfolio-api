const Experience = require('../models/experiences');

const experiencesService = (() => {
  const addOne = async (data) => {
    const experience = new Experience(data);
    return await experience.save();
  };

  const getById = async (id) => {
    const experience = await Experience.findById(id);
    return experience;
  };

  const getAll = async () => {
    const experiences = await Experience.find();
    return experiences;
  };

  const updateOne = async (id, updatedData) => {
    const experience = await Experience.findByIdAndUpdate(id, updatedData, { new: true });
    return experience;
  };

  const delOne = async (id) => {
    const experience = await Experience.findByIdAndRemove(id);
    return experience;
  };

  const delMany = async (ids) => {
    const experiences = await Experience.deleteMany({ _id: { $in: ids } });
    return experiences;
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

module.exports = experiencesService;
