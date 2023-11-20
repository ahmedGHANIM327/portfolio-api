const Certefication = require('../models/certefications');

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
    const certefication = await Certefication.findByIdAndRemove(id);
    return certefication;
  };

  const delMany = async (ids) => {
    const certefication = await Certefication.deleteMany({ _id: { $in: ids } });
    return certefication;
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

module.exports = certeficationsService;
