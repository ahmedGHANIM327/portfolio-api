const mongoose = require('mongoose');

const languagesSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Languages = mongoose.model('languages', languagesSchema);

module.exports = Languages;
