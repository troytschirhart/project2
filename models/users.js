const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const beerSchema = require('./beers.js');

const userSchema = Schema({
  username: String,
  password: String,
  beerList: [
    {
    name: {type: String, required: true},
    type: {type: String},
    brewery: { type: String},
    image: {type: String, required: true},
    description: {type: String},
    rating: {type: Number},
    notes: {type: String}
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;
