const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  dateOfBirth: Date,
  address: String,
  currentPosition: String,
  label: String,
  cv: String,
  photo: String,
  nationality: String
}, {
  timestamps: true
});

const Profile = mongoose.model('profile', profileSchema);

// Export the Profile model
module.exports = Profile;
