const mongoose = require('mongoose');

const experiencesSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  company: {
    name: {
      type: String,
      required: true
    },
    address: String,
    email: String,
    phone: String,
    website: String
  },
  jobLocation: {
    type: String,
    required: true
  },
  isCurrentPosition: {
    type: Boolean,
    default: false
  },
  startDate: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  endDate: Date,
  sector: String,
  description: String,
  achievements: [String],
  skillsAcquired: [String],
  projectLink: String
}, {
  timestamps: true
});

const Experiences = mongoose.model('experiences', experiencesSchema);

module.exports = Experiences;
