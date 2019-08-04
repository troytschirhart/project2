const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  brewery: { type: String},
  image: {type: String},
  description: {type: String}
});

const Beer = mongoose.model('beers', beerSchema);

module.exports = Beer;
