const Language = require('../models/languages');

const languagesService = (() => {
  const addOne = async (data) => {
    const language = new Language(data);
    return await language.save();
  };

  const getById = async (id) => {
    const language = await Language.findById(id);
    return language;
  };

  const getUserLanguages = async (userId) => {
    const languages = await Language.find({ user: userId });
    return languages;
  };

  const getAll = async () => {
    const languages = await Language.find();
    return languages;
  };

  const updateOne = async (id, updatedData) => {
    const language = await Language.findByIdAndUpdate(id, updatedData, { new: true });
    return language;
  };

  const delOne = async (id) => {
    const language = await Language.findByIdAndDelete(id);
    return language;
  };

  return {
    addOne,
    getById,
    getAll,
    updateOne,
    delOne,
    getUserLanguages
  };
})();

module.exports = languagesService;
