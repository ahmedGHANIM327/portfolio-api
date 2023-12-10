const uuid = require('uuid');

const generateUniqueFileName = (fileCategory, originalFileName) => {
  const uniqueId = uuid.v4();
  const timestamp = Date.now();
  const fileExtension = originalFileName.split('.').pop();
  return `${fileCategory}_${timestamp}_${uniqueId}.${fileExtension}`;
};

module.exports = {
  generateUniqueFileName
};
