const Profile = require('../models/profile');

const profileService = (() => {
  const saveProfile = async (data) => {
    const profile = new Profile(data);
    return await profile.save();
  };

  const getProfile = async () => {
    const profile = await await Profile.findOne();
    return profile;
  };

  const updateProfile = async (id, updatedData) => {
    const profile = await Profile.findOneAndUpdate({}, updatedData, { new: true });
    return profile;
  };

  const delProfile = async () => {
    const profile = await Profile.findOneAndDelete({});
    return profile;
  };

  return {
    saveProfile,
    getProfile,
    updateProfile,
    delProfile
  };
})();

module.exports = profileService;
