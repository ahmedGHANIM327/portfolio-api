const { length, equals } = require('ramda');
const Profile = require('../models/profile');

const profileService = (() => {
  const createProfile = async (data) => {
    const profile = new Profile(data);
    return await profile.save();
  };

  const getProfile = async () => {
    const profile = await await Profile.findOne();
    return profile;
  };

  const updateProfile = async (updatedData) => {
    const profile = await Profile.findOneAndUpdate({}, updatedData, { new: true });
    return profile;
  };

  const isProfileCreated = async () => {
    const profiles = await await Profile.find();
    return equals(length(profiles), 1);
  };

  return {
    createProfile,
    getProfile,
    updateProfile,
    isProfileCreated
  };
})();

module.exports = profileService;
