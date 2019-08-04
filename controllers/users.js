
// Controllers
const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users.js');

// Show the "create a user" form
users.get('/new', (req, res) => {
  res.render('users/new.ejs');
})

// Create a user
users.post('/', (req, res) => {
  // Hash the user's password
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createduser) => {
    if (err) {
      console.log(err);
    } else {
    res.render('app/index.ejs');
    }
  });
});

module.exports = users;
