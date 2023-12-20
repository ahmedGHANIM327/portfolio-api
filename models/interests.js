const mongoose = require('mongoose');

const InterestsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  description: String,
  photo: String
}, {
  timestamps: true
});

const Interests = mongoose.model('interests', InterestsSchema);

module.exports = Interests;
