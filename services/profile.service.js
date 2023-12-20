const { length, equals } = require('ramda');
const Profile = require('../models/profile');

const profileService = (() => {
  const createProfile = async (data) => {
    const profile = new Profile(data);
    return await profile.save();
  };

  const getProfile = async (userId) => {
    const profile = await Profile.findOne({ user: userId });
    return profile;
  };

  const getAllProfiles = async () => {
    const profiles = await Profile.find();
    return profiles;
  };

  const updateProfile = async (userId, updatedData) => {
    const profile = await Profile.findOneAndUpdate({ user: userId }, updatedData, { new: true });
    return profile;
  };

  const isProfileCreated = async (userId) => {
    const profiles = await Profile.find({ user: userId });
    return equals(length(profiles), 1);
  };

  return {
    createProfile,
    getProfile,
    getAllProfiles,
    updateProfile,
    isProfileCreated
  };
})();

module.exports = profileService;
