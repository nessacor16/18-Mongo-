var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3333;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Mongo y Mongoose
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/solarSystem";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true });





// Requiring the `User` model for accessing the `users` collection
var User = require("./models/User.js");

// Routes


// Route for retrieving all Users from the db
app.get("/user", function(req, res) {
  // Find all Users
  db.User.find({})
    .then(function(dbUser) {
      // If all Users are successfully found, send them back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error back to the client
      res.json(err);
    });
});




// Routes

// Route to post our form submission to mongoDB via mongoose
app.post("/submit", function(req, res) {
  // Create a new user using req.body

  var user = new User(req.body);
  user.lastUpdatedDate();

  User.create(user)
    .then(function(dbUser) {
      // If saved successfully, send the the new User document to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

// Route to see what user looks like WITH populating
app.get("/solarSystem", function(req, res) {
  // TODO
  // =====
  // Write the query to grab the documents from the User collection,
  // and populate them with any associated Notes.
  // TIP: Check the models out to see how the Notes refers to the User
});
















// Start the server
app.listen(PORT, function() {
  console.log("==> 🌎  Listening on port AWESOME %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});