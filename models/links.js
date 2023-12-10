const mongoose = require('mongoose');

const LinksSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Links = mongoose.model('links', LinksSchema);

module.exports = Links;
