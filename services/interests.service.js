const Interest = require('../models/interests');

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
    const interest = await Interest.findByIdAndRemove(id);
    return interest;
  };

  const delMany = async (ids) => {
    const interests = await Interest.deleteMany({ _id: { $in: ids } });
    return interests;
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

module.exports = interestsService;
