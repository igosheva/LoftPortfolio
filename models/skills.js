const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillsSchema = new Schema({
  category: {
    type: String
  },
  items: {
    type: [{
      name: {
        type: String
      },
      value: {
        type: Number,
        default: 0
      }
    }]
  }
})

mongoose.model('skills', SkillsSchema);