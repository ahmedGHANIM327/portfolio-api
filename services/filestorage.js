const { prop } = require('ramda');
const Bucket = require('../config/filestorage');
const { generateUniqueFileName } = require('../util/filestorage');

const fileStorageService = (() => {
  const getFile = async (fileName) => {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);

    const file = Bucket.file(fileName);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: expirationDate
    });
    return url;
  };

  const saveFile = async (fileCategory, file) => {
    try {
      const fileName = prop('originalname', file);
      const fileBuffer = prop('buffer', file);
      const uniqueFileName = generateUniqueFileName(fileCategory, fileName);
      const fileBucket = Bucket.file(`${fileCategory}/${uniqueFileName}`);
      await fileBucket.save(fileBuffer);
      return { ok: true, fileName: prop('name', fileBucket) };
    } catch (error) {
      return { ok: false, error };
    }
  };

  const deleteFile = async (fileName) => {
    try {
      const file = Bucket.file(fileName);
      await file.delete();
      return { ok: true, success: 'FILE_DELETED_SUCCESSFULY' };
    } catch (error) {
      return { ok: false, error };
    }
  };

  return {
    saveFile,
    getFile,
    deleteFile
  };
})();

module.exports = fileStorageService;
