const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  image: String,
  links: [
    {
      type: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      }
    }
  ],
  categories: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  currentlyWorkingOn: {
    type: Boolean,
    default: false
  },
  projectDescription: String,
  toolsUsed: [String],
  contributors: [{
    name: String,
    email: String,
    phone: String,
    linkedin: String,
    website: String
  }],
  customer: {
    name: String,
    email: String,
    phone: String,
    website: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true
});

const Projects = mongoose.model('projects', projectsSchema);

module.exports = Projects;
