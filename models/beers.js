const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  type: {type: String},
  brewery: { type: String},
  image: {type: String, required: true},
  description: {type: String},
  rating: {type: Number},
  notes: {type: String}
});

const Beer = mongoose.model('beers', beerSchema);

module.exports = Beer;
