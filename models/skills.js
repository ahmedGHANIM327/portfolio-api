const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
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
  },
  icon: String,
  description: String
}, {
  timestamps: true
});

const Skills = mongoose.model('skills', skillsSchema);

module.exports = Skills;
