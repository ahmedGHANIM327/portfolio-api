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
  getFileAccessLink,
  getFilesAccessLinks
} = require('../util/transformations');

const profileController = (() => {
  const createProfile = async (req, res) => {
    const user = prop('currentUser', req);

    const isProfileCreated = await profileService.isProfileCreated(user);
    if (isProfileCreated) {
      throw new Error('PROFILE_ALREADY_CREATED');
    }
    const data = prop('body', req);

    // Validate data getting from request
    validateProfileData(data);

    data.user = user;

    // Get and save cv if exists
    const cv = path(['files', 'cv', 0], req);

    if (isNotUndefined(cv)) {
      // Validate diploma
      validateFile(['pdf'], cv);

      // Store diploma to storage
      const resultStorage = await fileStorageService.saveFile('profile', cv, user);

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
      const resultStorage = await fileStorageService.saveFile('profile', photo, user);

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
    // Get & validate user Id
    const userId = prop('currentUser', req);

    validateId(userId);

    // get data and verify if it exists
    const profile = await profileService.getProfile(userId);
    if (!profile) throw new Error('PROFILE_NOT_CREATED_YET');

    await getFileAccessLink(profile, ['cv', 'photo']);

    res.status(200).json({ ok: true, data: profile });
  };

  const getAllProfiles = async (req, res) => {
    // get data and verify if it exists
    const profiles = await profileService.getAllProfiles();
    if (!profiles) throw new Error('NO_PROFILE_FOUND');

    await getFilesAccessLinks(profiles, ['cv', 'photo']);

    res.status(200).json({ ok: true, data: profiles });
  };

  const updateProfile = async (req, res) => {
    const user = prop('currentUser', req);
    const isProfileCreated = await profileService.isProfileCreated(user);
    if (!isProfileCreated) {
      throw new Error('PROFILE_NOT_CREATED_YET');
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
      const resultStorage = await fileStorageService.saveFile('profile', cv, user);

      // verify diploma is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      updatedData.cv = prop('fileName', resultStorage);

      // Del old file
      await profileService.delFiles(id, ['cv']);
    }

    // Get and save profile photo if exists
    const photo = path(['files', 'photo', 0], req);

    // if photo exists
    if (isNotUndefined(photo)) {
      // Validate photo
      validateFile(['png', 'jpg', 'jpeg'], photo);

      // Store photo to storage
      const resultStorage = await fileStorageService.saveFile('profile', photo, user);

      // verify photo is stored successfuly
      if (!prop('ok', resultStorage)) {
        throw new Error(prop('error', resultStorage));
      }

      // Create our final data
      updatedData.photo = prop('fileName', resultStorage);

      // Del old file
      await profileService.delFiles(id, ['photo']);
    }

    // Add data to db
    await profileService.updateProfile(updatedData);

    res.status(200).json({ ok: true, success: 'PROFILE_UPDATED_SUCCESSFULY' });
  };

  return {
    createProfile,
    getProfile,
    getAllProfiles,
    updateProfile
  };
})();

module.exports = profileController;
