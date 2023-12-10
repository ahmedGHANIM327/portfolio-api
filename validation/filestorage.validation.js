const { pipe, path, lte, prop } = require('ramda');

const validateFile = (acceptedTypes, file) => {
  const isValidType = pipe(
    path(['originalname']),
    fileName => fileName.split('.').pop().toLowerCase(),
    extension => acceptedTypes.includes(extension)
  )(file);

  if (!isValidType) throw new Error('INVALID_FILE_TYPE');

  const isValidSize = pipe(
    prop('size'),
    length => lte(length, process.env.FILE_MAX_SIZE)
  )(file);

  if (!isValidSize) throw new Error('INVALID_FILE_SIZE');
};

module.exports = validateFile;
