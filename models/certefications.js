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
    type: Date,
    required: true
  },
  expiryDate: Date,
  file: String,
  website: String,
  description: String
});

const Certifications = mongoose.model('certifications', certificationsSchema);

module.exports = Certifications;
