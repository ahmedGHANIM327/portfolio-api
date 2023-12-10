const profileService = require('../services/profile.service');
const fileStorageService = require('../services/filestorage');
const { prop, path } = require('ramda');
const { isNotUndefined } = require('ramda-adjunct');
const {
  validateProfileData,
  validateFile,
  validateId
} = require('../validation');
const {
  getFileAccessLink
} = require('../util/transformations');

const profileController = (() => {
  const createProfile = async (req, res) => {
    const isProfileCreated = await profileService.isProfileCreated();
    if (isProfileCreated) {
      throw new Error('PROFILE_ALREADY_CREATED');
    }
    const data = prop('body', req);

    // Validate data getting from request
    validateProfileData(data);

    // Get and save cv if exists
    const cv = path(['files', 'cv', 0], req);

    if (isNotUndefined(cv)) {
      // Validate diploma
      validateFile(['pdf'], cv);

      // Store diploma to storage
      const resultStorage = await fileStorageService.saveFile('profile', cv);

      // verify diploma is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      data.cv = prop('fileName', resultStorage);
    }

    // Get and save profile photo if exists
    const photo = path(['files', 'photo', 0], req);

    // if photo exists
    if (isNotUndefined(photo)) {
      // Validate photo
      validateFile(['png', 'jpg', 'jpeg'], photo);

      // Store photo to storage
      const resultStorage = await fileStorageService.saveFile('profile', photo);

      // verify photo is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      data.photo = prop('fileName', resultStorage);
    }

    // Add data to db
    await profileService.createProfile(data);

    res.status(200).json({ ok: true, success: 'PROFILE_CREATED_SUCCESSFULY' });
  };

  const getProfile = async (req, res) => {
    // get data and verify if it exists
    const profile = await profileService.getProfile();
    if (!profile) throw new Error('PROFILE_NOT_CREATED_YET');

    await getFileAccessLink(profile, ['cv', 'photo']);

    res.status(200).json({ ok: true, data: profile });
  };

  const updateProfile = async (req, res) => {
    const isProfileCreated = await profileService.isProfileCreated();
    if (!isProfileCreated) {
      throw new Error('PROFILE_NOT_CREATED');
    }

    // validate Id
    const id = path(['params', 'id'], req);
    validateId(id);

    // validate updated data
    const updatedData = prop('body', req);

    // Validate updatedData getting from request
    validateProfileData(updatedData);

    // Get and save cv if exists
    const cv = path(['files', 'cv', 0], req);

    if (isNotUndefined(cv)) {
      // Validate diploma
      validateFile(['pdf'], cv);

      // Store diploma to storage
      const resultStorage = await fileStorageService.saveFile('profile', cv);

      // verify diploma is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      updatedData.cv = prop('fileName', resultStorage);
    } else {
      updatedData.cv = null;
    }

    // Get and save profile photo if exists
    const photo = path(['files', 'photo', 0], req);

    // if photo exists
    if (isNotUndefined(photo)) {
      // Validate photo
      validateFile(['png', 'jpg', 'jpeg'], photo);

      // Store photo to storage
      const resultStorage = await fileStorageService.saveFile('profile', photo);

      // verify photo is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      updatedData.photo = prop('fileName', resultStorage);
    } else {
      updatedData.photo = null;
    }

    // Del old file
    await profileService.delFiles(id, ['cv', 'photo']);

    // Add data to db
    await profileService.updateProfile(updatedData);

    res.status(200).json({ ok: true, success: 'PROFILE_UPDATED_SUCCESSFULY' });
  };

  return {
    createProfile,
    getProfile,
    updateProfile
  };
})();

module.exports = profileController;
