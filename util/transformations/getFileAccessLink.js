const { prop } = require('ramda');
const fileStorageService = require('../../services/filestorage');

const getFileAccessLink = async (certefication, filesList) => {
  for (const file of filesList) {
    if (prop(file, certefication)) {
      const link = await fileStorageService.getFile(prop(file, certefication));
      certefication[file] = link;
    }
  }
};

module.exports = getFileAccessLink;
