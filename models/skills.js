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
  description: String
});

const Skills = mongoose.model('skills', skillsSchema);

module.exports = Skills;
