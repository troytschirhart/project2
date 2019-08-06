const express = require('express');
const beers = express.Router();
const Beer = require('../models/beers.js');
const User = require('../models/users.js');
const seedData = require('../models/seed_data.js');

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
// extended: false - does not allow nested objects in query strings
// beers.use(express.urlencoded({ extended: true }));

//========================================================
// ROUTES
//========================================================
// ============================================ SEED
beers.get('/seed', (req, res) => {
  Beer.create(seedData, (err, data) => {
    res.redirect('/beers');
  })
})

// ============================================ INDEX
beers.get('/' , (req, res) => {
  Beer.find({}, (error, allBeers) => {
    res.render('beers/index.ejs', {
      currentUser: req.session.currentUser
    });
  })
});


// ============================================ NEW
beers.get('/new', (req, res) => {
  res.render('beers/new.ejs');
})


// ============================================ CREATE
beers.post('/', (req, res) => {
  Beer.create(req.body, (error, createdBeer) => {
    res.redirect('/beers');
  })
})


// ============================================ SHOW
beers.get('/:userID/:id', (req, res) => {
  // currentUser: req.session.currentUser
  User.findById(req.params.userID, (err, foundUser) => {
    console.log(req.params.id);
    console.log(req.beers.locals.beerArray[req.params.id]);
  })
  // console.log(req.params.currentUser);
  // console.log(currentUser.beerList[req.params.id]);     // changing to ind dbs
  // Beer.findById(req.params.id, (err, foundBeer) => {
  //   res.render('beers/show.ejs', {
  //     beer: foundBeer
  //   })
  // })
})


// ============================================ EDIT
beers.get('/:id/edit', (req, res) => {
  // console.log(req.session.beerList[req.params.id]);     // changing to ind dbs
  Beer.findById(req.params.id, (err, foundBeer) => {
    res.render(
      'beers/edit.ejs',
      {
        beer: foundBeer
      }
    );
  });
});


// ============================================ UPDATE
beers.put('/:id', (req, res) => {
  Beer.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBeer) => {
    res.redirect('/beers');
  });
});


// ============================================ DELETE
beers.delete('/:id', (req, res) => {
  Beer.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/beers');
  });
});


module.exports = beers;
