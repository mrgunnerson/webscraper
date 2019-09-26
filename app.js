// Connect to internal files
var routes = require("./routes/routes")

// Node modules
var express = require("express");
var exphbs = require("express-handlebars");

// Express initialize
var PORT = process.env.PORT || 3000;
var app = express();

// module.exports = db;
// var db = require("./server/server")

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

var hbs = exphbs.create({
    partialsDir: [
        'shared/templates/',
        '/views/partials/'
    ]
})

// Routing for the app
app.use(routes);


// Listen for the app
app.listen(PORT, function() {
    console.log("Listening on PORT " + PORT)
});