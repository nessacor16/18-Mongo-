// When you click the make-new button
$(document).on("click", "#user-submit", function(event) {
  event.preventDefault()
  // Grab the id associated with the article from the submit button
 window.location.assign("/home.html")

  // Run a POST request to change the note, using what's entered in the inputs
  // $.ajax({
  //   method: "POST",
  //   url: "/articles/" + thisId,
  //   data: {
  //     // Value taken from title input
  //     title: $("#titleinput").val(),
  //     // Value taken from note textarea
  //     body: $("#bodyinput").val()
  //   }
  // })

});





// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});



// Whenever someone clicks a p tag
$(document).on("click", "a", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h3>" + data.title + "</h3>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='make-new'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the make-new button
$(document).on("click", "#make-new", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});



// Loads results onto the page
function getResults() {
  // Empty any results currently on the page
  $("#results").empty();
  // Grab all of the current notes
  $.getJSON("/all", function(data) {
    // For each note...
    for (var i = 0; i < data.length; i++) {
      // ...populate #results with a p-tag that includes the note's title and object id
      $("#results").prepend("<p class='tabs_grid_desc' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
        data[i]._id + ">" + data[i].title + "</span><span class=delete>X</span></p>");
    }
  });
}

// Runs the getResults function as soon as the script is executed
getResults();






// When the #clear-all button is pressed
$("#clear-all").on("click", function() {
  // Make an AJAX GET request to delete the notes from the db
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/clearall",
    // On a successful call, clear the #results section
    success: function(response) {
      $("#results").empty();
    }
  });
});




















// // Grab the articles json and append each item to html.
// $.getJSON("/articles", function(data) {
//   for (var i = 0; i < data.length; i++) {
//     cssID = `#${data[i]._id}`
//     $("#articles").append("<div class='media' id='"+ data[i]._id + "'></div>")
//     $(cssID).append("<img src='" + data[i].image + "' class='mr-3' alt='" + data[i].title + "'>");
//     $(cssID).append("<div class='media-body'><h5><a href='" + data[i].link + "'>" + data[i].title + "</a></h5>" + data[i].summary + "</div>");
//     $(cssID).append("<button type='button' class='btn btn-warning' id='note' data-toggle='modal data-target='#notesModal' data-id='" + data[i]._id + "'>NOTE</buttton>");
//     $(cssID).append("<button type='button' class='btn btn-success' id='saveArticle' data-id='" + data[i]._id + "'>SAVE</buttton>");
//   }
// });

// // NPR.org
// $(document).on("click", "#NASA.org", function(){
//   window.location.replace("https://solarsystem.nasa.gov/planets/overview/")
// })

// // SCRAPE
// $(document).on("click", "#scraper", function() {
//   $.ajax({
//     method: "GET",
//     url: "/scrape"
//   }).then(function(jsonResponseLocation){
//     window.location.replace(jsonResponseLocation);
//   })
// });

// // DYNAMICALLY LOAD SAVED ARTICLES
// $(document).on("click", "#savedArticlesBtn", function() {
//   $.ajax({
//     method: "GET",
//     url: "/articles/savedArticles"
//   }).then(function(data){
//     $("#articles").empty();
//     for (var i = 0; i < data.length; i++) {
//       cssID = `#${data[i]._id}`
//       $("#articles").append("<div class='media' id='"+ data[i]._id + "'></div>")
//       $(cssID).append("<img src='" + data[i].image + "' class='mr-3' alt='" + data[i].title + "'>");
//       $(cssID).append("<div class='media-body'><h5><a href='" + data[i].link + "'>" + data[i].title + "</a></h5>" + data[i].summary + "</div>");
//       $(cssID).append("<button type='button' class='btn btn-warning' id='note' data-toggle='modal data-target='#notesModal' data-id='" + data[i]._id + "'>NOTE</buttton>");
//       $(cssID).append("<button type='button' class='btn btn-secondary' id='deleteOne' data-id='" + data[i]._id + "'>DELETE</buttton>");
//       // $("#articles").append("<br>");
//     }
//   })
// });

// // SAVE ARTICLES TO SAVED ARTICLES "PAGE"
// $(document).on("click", "#saveArticle", function() {
//   var thisID = $(this).attr("data-id")
//   var cssID = `#${thisID}`
//   $.ajax({
//     method: "POST",
//     url: "/articles/saveOneArticle/" + thisID
//   }).then(function(savedOne){
//     console.log(savedOne);
//     $(cssID).empty();
//     $(cssID).text("SAVED");
//   })
// })

// // DELETE ONE ARTICLE
// $(document).on("click", "#deleteOne", function() {
//   var thisID = $(this).attr("data-id")
//   var cssID = `#${thisID}`
//   $.ajax({
//     method: "DELETE",
//     url: "/articles/deleteOne/" + thisID
//   }).then(function(deleteOne){
//     $(cssID).empty();
//     $(cssID).text("DELETED");
//   })
// });

// // DELETE ALL UNSAVED ARTICLES
//   $(document).on("click", "#deleteAll", function() {
//     $.ajax({
//       method: "DELETE",
//       url: "/articles/deleteAll"
//     }).then(function(deleteAll){
//       $("#articles").empty();
//       $("#articles").text("DELETED");
//     })
//   });

// // TODO - swithc this to somethign that floats above.
// $(document).on("click", "#note", function() {
//   $("#notesModalLabel").val("");
//   $("#titleinput").val("");
//   $("#bodyinput").val("");
//   $('#notesModal').modal('toggle')
//   var thisId = $(this).attr("data-id");
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   }).then(function(data) {
//       console.log(data);
//       $("#notesModalLabel").text(data.title);
//       $("#deleteNote").attr("data-id", data._id);
//       $("#savenote").attr("data-id", data._id);
      
//       if (data.note) {
//         $("#titleinput").val(data.note.title);
//         $("#bodyinput").val(data.note.body);
//       }
//     });
// });

// // Save/update note to database.
// $(document).on("click", "#savenote", function() {
//   var thisId = $(this).attr("data-id");
//   $.ajax({
//     method: "POST",
//     url: "/notes/" + thisId,
//     data: {
//       title: $("#titleinput").val(),
//       body: $("#bodyinput").val()
//     }
//   }).then(function(data) {
//       console.log(data);
//     });
// });

// // Delete note
// $(document).on("click", "#deleteNote", function() {
//   var thisId = $(this).attr("data-id");
//   $.ajax({
//     method: "DELETE",
//     url: "/notes/" + thisId
//   })
//   .then(function(data){
//     console.log(data)
//   })
// });