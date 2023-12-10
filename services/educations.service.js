const Education = require('../models/educations');
const fileStorageService = require('./filestorage');
const { prop } = require('ramda');

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
    const education = await Education.findByIdAndDelete(id);
    return education;
  };

  const delFiles = async (id, fileType) => {
    const education = await Education.findById(id);
    for (const type of fileType) {
      if (prop(type, education)) {
        const result = await fileStorageService.deleteFile(prop(type, education));
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

module.exports = educationsService;
