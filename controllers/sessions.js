// Controllers
const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');


// Show the form for loggin in to a new session
sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs')
})

// When the user submits their login info
sessions.post('/', (req, res) => {
  // Look for the username
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) {              // If an error occurs in looking for the username
      console.log(err);
      res.send('Sorry, there was a problem with the database')

    } else if (!foundUser) {  // if the username is not found
      res.send('<a href="/">The user was not found </a>')

    } else {   // if the username is found, check the password
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        // If stored password matches submitted password, set current to found
        req.session.currentUser = foundUser;
        res.redirect('/') //==========================change to app index???

      } else {  // passwords do not match
        res.send('<a href="/">The password does not match </a>')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  console.log('trying to delete');
  req.session.destroy(() => {
    res.render('index.ejs');
  })
})


module.exports = sessions;
