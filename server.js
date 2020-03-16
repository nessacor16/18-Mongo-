var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

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



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


// Mongo y Mongoose
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/solarSystem";
mongoose.connect(MONGODB_URI, {useUnifiedTopology: true });





// Requiring the `User` model for accessing the `users` collection
// var User = require("./models/User.js");
// var Note = require("./models/Note.js");



require("./routes/html-routes.js")(app);
// Routes


// Start the server
app.listen(PORT, function() {
  console.log("==> 🌎  Listening on port AWESOME %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});




