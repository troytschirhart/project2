

//========================================================
// DEPENDENCIES
//========================================================
// Need this in order to use express
const express = require('express');
const app = express ();  // Define app as an express "thing"

// Need this in order to override methods (needed for other than post and get)
const methodOverride  = require('method-override');

// Need mongoose in order to connect to mongo
const mongoose = require ('mongoose');
const db = mongoose.connection;  // Define db as a connection to a mongo db

// Require dotenv becuase it contains my Atlas project link
require('dotenv').config();

// Require express-session so that my app can do logins & authentication
const session = require('express-session');

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
// Set MONGODB_URI equal to the value of MONGODB_URI set in .env
const MONGODB_URI = process.env.MONGODB_URI;


// Fix Deprecation Warnings from Mongoose*
// May or may not need these depending on your Mongoose version
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//========================================================
// MIDDLEWARE
//========================================================

// use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
// extended: false - does not allow nested objects in query strings
app.use(express.urlencoded({ extended: false }));

// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(express.json());

// use method override - allow POST, PUT and DELETE from a form
app.use(methodOverride('_method'));

// used somehow for session authentication...
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));


//========================================================
// ROUTES
//========================================================

// Go to the Welcom Page
app.get('/', (req, res) => {
  res.render('index.ejs');
})


// The controller references must be below the middleware

// const beerController = require('./controllers/beers.js');
// app.use('/beer', beerController);

const userController = require('./controllers/users.js');
app.use('/users', userController);

// const sessions Controller = require('./controllers/sessions.js');
// app.use('/sessions', sessionsController);

//localhost:3000
// app.get('/beers' , (req, res) => {
//   res.send('Hello World!');
// });





//========================================================
// LISTENER
//========================================================
app.listen(PORT, () => {
  console.log('Listening on port:', PORT)
});
