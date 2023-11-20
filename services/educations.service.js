const Education = require('../models/educations');

const educationsService = (() => {
  const addOne = async (data) => {
    const education = new Education(data);
    return await education.save();
  };

  const getById = async (id) => {
    const education = await Education.findById(id);
    return education;
  };

  const getAll = async () => {
    const educations = await Education.find();
    return educations;
  };

  const updateOne = async (id, updatedData) => {
    const education = await Education.findByIdAndUpdate(id, updatedData, { new: true });
    return education;
  };

  const delOne = async (id) => {
    const education = await Education.findByIdAndRemove(id);
    return education;
  };

  const delMany = async (ids) => {
    const educations = await Education.deleteMany({ _id: { $in: ids } });
    return educations;
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

module.exports = educationsService;
