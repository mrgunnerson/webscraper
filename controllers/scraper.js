var axios = require("axios");
var cheerio = require("cheerio");
var Article = require("../models/article");
function scrape(req, res) {
  axios.get("https://www.sfchronicle.com/elections/").then(function(response) {
    // handle success
    var $ = cheerio.load(response.data);
    var articles = $(
      "#content > div.right-rail > div.zone.zone-5.wide-only > div.hide-rss-link.hdnce-e.hdnce-collection-74575-premium_headlinelist_illus > div > div:nth-child(n+5)"
    );
    // console.log(article.find("h2 a").text());
    // console.log(article.find("p span").text());
    articles.each(function(index, element) {
      console.log($(element)
        .find("h2 a")
        .attr("href"))
      var title = $(element)
        .find("h2 a")
        .text()
        .trim();
      var url = 'https://www.sfchronicle.com'+$(element)
        .find("h2 a")
        .attr("href");
      var summary = $(element)
        .find("p span")
        .text()
        .trim();
      Article.findOne({ title: title }, function(err, result) {
        if (err) {
          return err;
        }
        if (result) {
          console.log("This has already been saved");
        } else {
          var article = new Article({
            title: title,
            summary: summary,
            url: url
          });
          article.save();
        }
      });
    });
  });
  res.render("done");
}

module.exports = { scrape: scrape };
