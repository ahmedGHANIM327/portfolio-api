const mongoose = require('mongoose');

const languagesSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true
});

const Languages = mongoose.model('languages', languagesSchema);

module.exports = Languages;
