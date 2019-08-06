const express = require('express');
const beers = express.Router();
const Beer = require('../models/beers.js');

const seedData = require('../models/seed_data.js');


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
      beers: allBeers
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
beers.get('/:id', (req, res) => {
  Beer.findById(req.params.id, (err, foundBeer) => {
    res.render('beers/show.ejs', {
      beer: foundBeer
    })
  })
})


// ============================================ EDIT
beers.get('/:id/edit', (req, res) => {
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
    // res.redirect('/beers');
    res.render('beers/show.ejs', {
      beer: updatedBeer
    })
  });
});


// ============================================ DELETE
beers.delete('/:id', (req, res) => {
  Beer.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/beers');
  });
});


module.exports = beers;
