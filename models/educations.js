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
  expectedEndDate: Date,
  description: String,
  achievements: [String],
  skills: [String],
  diploma: {
    name: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
});

const Educations = mongoose.model('educations', educationsSchema);

module.exports = Educations;
