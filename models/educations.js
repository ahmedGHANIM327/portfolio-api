const mongoose = require('mongoose');

const educationsSchema = new mongoose.Schema({
  school: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  fieldOfStudy: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  expectedEndDate: Date,
  description: String,
  achievements: [String],
  skills: [String],
  diploma: String
}, {
  timestamps: true
});

const Educations = mongoose.model('educations', educationsSchema);

module.exports = Educations;
