const Interest = require('../models/interests');
const fileStorageService = require('./filestorage');
const { prop } = require('ramda');

const interestsService = (() => {
  const addOne = async (data) => {
    const interest = new Interest(data);
    return await interest.save();
  };

  const getById = async (id) => {
    const interest = await Interest.findById(id);
    return interest;
  };

  const getAll = async () => {
    const interests = await Interest.find();
    return interests;
  };

  const updateOne = async (id, updatedData) => {
    const interest = await Interest.findByIdAndUpdate(id, updatedData, { new: true });
    return interest;
  };

  const delOne = async (id) => {
    const interest = await Interest.findByIdAndDelete(id);
    return interest;
  };

  const delFiles = async (id, fileType) => {
    const interest = await Interest.findById(id);
    for (const type of fileType) {
      if (prop(type, interest)) {
        const result = await fileStorageService.deleteFile(prop(type, interest));
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

module.exports = interestsService;
