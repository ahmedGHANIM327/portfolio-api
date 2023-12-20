const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  key: {
    type: String,
    required: true,
    unique: true
  },
  label: {
    type: String,
    required: true
  }
});

const ApiKey = mongoose.model('apiKeys', apiKeySchema);

module.exports = ApiKey;
