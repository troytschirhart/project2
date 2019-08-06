
// Controllers
const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users.js');

// Require access to the seed data
const seedArray = require('../models/seed_data.js')

// Show the "create a user" form
users.get('/new', (req, res) => {
  res.render('users/new.ejs');
})

// Create a user
users.post('/', (req, res) => {
  // Hash the user's password
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  // Seed the user with the seedArray of 10 beers
  // req.body.beerList[0] = {name: 'beer1', image: 'https://image.shutterstock.com/image-photo/empty-beer-mug-260nw-286083170.jpg'}
  // console.log(req.body);
  User.create(req.body, (err, createduser) => {
    if (err) {
      console.log(err);
    } else {
      // createduser.beerList[0] = {name: 'beer1', image: 'https://image.shutterstock.com/image-photo/empty-beer-mug-260nw-286083170.jpg'}


      for (let i = 0; i < seedArray.length; i++) {
        createduser.beerList.push(seedArray[i])
      }

      // req.beers.locals.beerArray = req.session.currentUser.beerList;
      // console.log(req.beers.locals.beerArray);
    // currentUser: req.session.currentUser
    // console.log(req.session.currentUser);
      // console.log(createduser);
    res.render('beers/index.ejs', {
      currentUser: createduser
    });
    }
  });
});

module.exports = users;
