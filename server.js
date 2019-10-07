// // Using this template, the cheerio documentation,
// // and what you've learned in class so far, scrape a website
// // of your choice, save information from the page in a result array, and log it to the console.

// var cheerio = require("cheerio");
// var axios = require("axios");

// // Make a request via axios to grab the HTML body from the site of your choice
// axios.get("https://www.nytimes.com").then(function(response) {

//   // Load the HTML into cheerio and save it to a variable
//   // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//   var $ = cheerio.load(response.data);

//   // An empty array to save the data that we'll scrape
//   var results = [];

//   // Select each element in the HTML body from which you want information.
//   // NOTE: Cheerio selectors function similarly to jQuery's selectors,
//   // but be sure to visit the package's npm page to see how it works
//   $("article").each(function(i, element) {

//     var title = $(element).children().text();
//     var link = $(element).find("a").attr("href");

//     // Save these results in an object that we'll push into the results array we defined earlier
//     results.push({
//       title: title,
//       link: link
//     });
//   });

//   // Log the results once you've looped through each of the elements found with cheerio
//   console.log(results);
// });


var express = require('express')
var exphbs  = require('express-handlebars')
var routes = require('./routes')
var app = express()
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/scraper', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', function(){
    console.log('db-error')
});
db.once('open', function() {
  // we're connected!
  console.log('connected!')
});
app.use(express.urlencoded())
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// app.get('/', function (req, res) {
//     res.render('home');
// });
app.use(routes)
var port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`server listening on port ${port}!`)
})

