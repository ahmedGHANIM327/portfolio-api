const ApiKey = require('../models/apikey');

const apikeysService = (() => {
  const addOne = async (data) => {
    const apikey = new ApiKey(data);
    return await apikey.save();
  };

  const getById = async (id) => {
    const apikey = await ApiKey.findById(id);
    return apikey;
  };

  const getByKey = async (key) => {
    const apikey = await ApiKey.findOne({ key });
    return apikey;
  };

  const getAll = async () => {
    const apikeys = await ApiKey.find();
    return apikeys;
  };

  const getUserKeys = async (userId) => {
    const apikeys = await ApiKey.find({ user: userId });
    return apikeys;
  };

  const updateOne = async (id, updatedData) => {
    const apikey = await ApiKey.findByIdAndUpdate(id, updatedData, { new: true });
    return apikey;
  };

  const delOne = async (id) => {
    const apikey = await ApiKey.findByIdAndDelete(id);
    return apikey;
  };

  return {
    addOne,
    getById,
    getAll,
    updateOne,
    delOne,
    getUserKeys,
    getByKey
  };
})();

module.exports = apikeysService;
