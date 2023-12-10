const mongoose = require('mongoose');

const certificationsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  dateOfIssue: {
    type: Date
  },
  expiryDate: Date,
  file: String,
  website: String,
  description: String
}, {
  timestamps: true
});

const Certifications = mongoose.model('certifications', certificationsSchema);

module.exports = Certifications;
