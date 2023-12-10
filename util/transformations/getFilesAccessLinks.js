const { prop } = require('ramda');
const fileStorageService = require('../../services/filestorage');

const getFilesAccessLinks = async (certefications, filesList) => {
  for (const cert of certefications) {
    for (const file of filesList) {
      if (prop(file, cert)) {
        const link = await fileStorageService.getFile(prop(file, cert));
        cert[file] = link;
      }
    }
  }
};

module.exports = getFilesAccessLinks;
