const mongoose = require('mongoose');

const InterestsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  photo: String
});

const Interests = mongoose.model('interests', InterestsSchema);

module.exports = Interests;
