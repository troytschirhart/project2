
Project #2
Beer Tracker App

Github Link:  https://github.com/troytschirhart/project2
Heroku Link:  https://frozen-plateau-29444.herokuapp.com

The Beer Tracker App contains a database of beers, and users can create a login to access the list.  Once logged in, users can add another beer to the list, they can view additional information on the listed beers, they can edit the information on the listed beers and they can delete beers.  

This application uses HTML, CSS, Javascript, Express, Node, MongoDB and Mongoose.  The views are built with HTML and CSS, the data is stored and retrieved using MongoDB and Mongoose, and the data is manipulated using Javascript.  

The app implements the 7 RESTful routes which are used to Create, Read, Update and Delete information. The app is set up using a Models-Views-Controllers construct with a server file at the top level.  Controllers were built for beers, sessions and users.  Sessions and users are necessary for authentication.  Models were built for users, beers and seed data, and views were constructed for the index, show, edit and new pages.

As submitted, all of the beers in this app are stored in a single shared database.  With this construct, each user can overwrite the ratings and notes of other users.  To prevent this, it is desired that each users have a separate beer list.  To facilitate this, I added an array to each user to contain beer objects.  I was able to create users and populate their beer array with the seed data, then proceed to the index page where the beers were rendered.  When a user clicked on a beer to transition to the show page, the Beer controller was unable to locate the selected beer by ID, presumably becuase the beers were buried in an array within a user.  To remedy this, I had the route pass the user's ID and the array index of the selected beer.  The controller then searched for the user by ID, and consistently found the correct user.  However, the beer array in user was now empty.  I suspected that the issue was related to the extended:false setting which prevents passing embedded objects, so I changed this value to true.  Unfortunately this did not solve the problem.  Figuring out how to pass embedded objects seems to be the only hurdle to implementing separate beer lists, although once cleared another hurdle may certainly manifest.
