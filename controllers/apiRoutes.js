const axios = require("axios");
const db = require("../models");
const express = require("express");
const app = express();
const cheerio = require("cheerio");


router.get("/", function(req, res) {
  res.redirect("/Users");
});
router.get("/", function(req, res) {
  res.redirect("/Articles");
});



// readAll: /api/articles
// readone: /api/articles/:id
// create: /api/articles
// update: /api/aricles/:id
// deleteAll: /api/articles
// deleteOne: /api/articles/:id

// ================================================ USER LOG-IN ==========================================
// ================================================ USER LOG-IN ==========================================
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



// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://solarsystem.nasa.gov/planets/overview/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $(".tab_inner grid_layout").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});




// const axios = require("axios");
// const db = require("../models");
// const express = require("express");
// const app = express();
// const cheerio = require("cheerio");



// // ----------------------------------------------------------USERS
// // Route for retrieving all Users from the db
// app.get("/user", function(req, res) {
//   // Find all Users
//   db.User.find({})
//     .then(function(dbUser) {
//       // If all Users are successfully found, send them back to the client
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       // If an error occurs, send the error back to the client
//       res.json(err);
//     });
// });



// // Route to post our form submission to mongoDB via mongoose
// app.post("/submit", function(req, res) {
//   console.log("/submit");
//   // Create a new user using req.body

//   var user = new User(req.body);
//   user.lastUpdatedDate();

//   User.create(user)
//     .then(function(dbUser) {
//       // If saved successfully, send the the new User document to the client
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       // If an error occurs, send the error to the client
//       res.json(err);
//     });
// });

// // Route to see what user looks like WITH populating
// app.get("/solarSystem", function(req, res) {
//   // TODO
//   // =====
//   // Write the query to grab the documents from the User collection,
//   // and populate them with any associated Notes.
//   // TIP: Check the models out to see how the Notes refers to the User
// });

// // ============================================================================SCRAPER

//   // Scrape route, saves to results, 
//   // creates article from model, 
//   // saves to DB, 
//   // returns dbArticle to app.js
//   app.get("/scrape", function(req, res) {
//     axios.get("https://solarsystem.nasa.gov/planets/overview/").then(function(response) {
//       let $ = cheerio.load(response.data);
//       $(".tab_inner grid_layout").each(function(i, element) {
//         let result = {};

//         result.title = $(this)
//           .children(".tabs_grid_item")
//           .children("a")
//           .children("<div>")
//           .text();
//         result.link = $(this)
//           .children(".tabs_grid_item")
//           .children("a")
//           .attr("href");
//         result.summary = $(this)
//           .children(".tabs_grid_item")
//           .children("a")
//           .children("<div>")
//           .text();
//         result.image = $(this)
//           .children("figure")
//           .children("div")
//           .children("div")
//           .children("a")
//           .children("img")
//           .attr("src");

//         db.Article.create(result)
//           .then(function(dbArticle) {
//             console.log(dbArticle);
//           })
//           .catch(function(err) {
//             console.log(err);
//           });
//       });
//       res.json("/");
//     });
//   });

//   // Get saved articles
//   app.get("/articles/savedArticles", function(req, res){
//     db.Article.find({
//       saved: true
//     })
//     .then(function(dbSavedArticles){
//       res.json(dbSavedArticles);
//     })
//   });

//   // Save articles
//   app.post("/articles/saveOneArticle/:id", function(req, res){
//     db.Article.findByIdAndUpdate(req.params.id, { saved: true })
//     .then(function(dbSavedArticle){
//       res.json(dbSavedArticle);
//     })
//     .catch(function(err){
//       res.json(err);
//     })
//   });
  
//   // Get articles for main page.
//   app.get("/articles", function(req, res) {
//     db.Article.find({
//       saved: false
//     })
//     .then(function(dbArticles){
//       res.json(dbArticles);
//     })
//   });
  
//   // get notes from db and populate for this ID
//   app.get("/articles/:id", function(req, res) {
//     db.Article.findOne({ _id: req.params.id})
//     .populate("note")
//     .then(function(dbArticles){
//       res.json(dbArticles)
//     })
//   });
  
//   // update artticle on DB with not ID
//   app.post("/notes/:id", function(req, res) {
//     db.Note.create(req.body)
//       .then(function(dbNote) {
//         return db.Article.findByIdAndUpdate(req.params.id, { note: dbNote._id });
//       })
//       .then(function(dbArticle){
//         res.json(dbArticle);
//       })
//       .catch(function(err){
//         res.json(err);
//       })
//   });

//   // delete note for article
//   app.delete("/notes/:id", function(req, res) {
//     db.Note.deleteOne(req.body)
//     .then(function(dbNote){
//       return db.Article.findByIdAndUpdate(req.params.id, { note: dbNote._id });
//     })
//     .then(function(deleted){
//       res.json(deleted);
//     })
//     .catch(function(err){
//       res.json(err);
//     })
//   });

//   // Delete one article from DB.
//   app.delete("/articles/deleteOne/:id", function(req, res){
//     db.Article.findByIdAndDelete({_id: req.params.id})
//     .then(function(deleted){
//       res.json(deleted);
//     })
//     .catch(function(err){
//       res.json(err);
//     })
//   })


//   // Delete all articles except saved articles from DB.
//   app.delete("/articles/deleteAll", function(req, res){
//     db.Article.deleteMany({ saved: false })
//     .then(function(deleted){
//       res.json(deleted);
//     })
//     .catch(function(err){
//       res.json(err);
//     })
//   })

// module.exports = app;