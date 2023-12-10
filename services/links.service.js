const Link = require('../models/links');

const linksService = (() => {
  const addOne = async (data) => {
    const link = new Link(data);
    return await link.save();
  };

  const getById = async (id) => {
    const link = await Link.findById(id);
    return link;
  };

  const getAll = async () => {
    const links = await Link.find();
    return links;
  };

  const updateOne = async (id, updatedData) => {
    const link = await Link.findByIdAndUpdate(id, updatedData, { new: true });
    return link;
  };

  const delOne = async (id) => {
    const link = await Link.findByIdAndDelete(id);
    return link;
  };

  return {
    addOne,
    getById,
    getAll,
    updateOne,
    delOne
  };
})();

module.exports = linksService;
