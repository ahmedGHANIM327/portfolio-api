const { prop } = require('ramda');
const Certefication = require('../models/certefications');
const fileStorageService = require('./filestorage');

const certeficationsService = (() => {
  const addOne = async (data) => {
    const certefication = new Certefication(data);
    return await certefication.save();
  };

  const getById = async (id) => {
    const certefication = await Certefication.findById(id);
    return certefication;
  };

  const getAll = async () => {
    const certefications = await Certefication.find();
    return certefications;
  };

  const updateOne = async (id, updatedData) => {
    const certefication = await Certefication.findByIdAndUpdate(id, updatedData, { new: true });
    return certefication;
  };

  const delOne = async (id) => {
    const certefication = await Certefication.findByIdAndDelete(id);
    return certefication;
  };

  const delFiles = async (id, fileType) => {
    const certefication = await Certefication.findById(id);
    for (const type of fileType) {
      if (prop(type, certefication)) {
        const result = await fileStorageService.deleteFile(prop(type, certefication));
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

module.exports = certeficationsService;
