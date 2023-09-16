const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  title1: {
    type: String,
    required: true,
  },
  title2: {
    type: String,
    required: true,
  },
  title3: {
    type: String,
    required: true,
  },
  backgroundImage: {
    data: Buffer,
    contentType: String,
  },
});

const HeroModel = mongoose.model('skyfalke_hero', heroSchema);

module.exports = HeroModel;
