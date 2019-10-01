var axios = require("axios");
var cheerio = require("cheerio");
var Article = require("../models/article");
function scrape(req, res) {
  axios.get("https://www.sfchronicle.com/elections/").then(function(response) {
    // handle success
    var $ = cheerio.load(response.data);
    var article = $(
      "#content > div.right-rail > div.zone.zone-5.wide-only > div.hide-rss-link.hdnce-e.hdnce-collection-74575-premium_headlinelist_illus > div > div:nth-child(2)"
    );
    console.log(article.find("h2 a").text());
    console.log(article.find("p span").text());
    var title = article
      .find("h2 a")
      .text()
      .trim();
    var summary = article
      .find("p span")
      .text()
      .trim();
    Article.findOne({ title: title }, function(err, article) {
      if (err) {
        return err;
      }
      if (article) {
        console.log("This has already been saved");
      } else {
        var article = new Article({
          title: title,
          summary: summary
        });
        article.save();
      }
    });
  });
  res.send("okay");
}

module.exports = { scrape: scrape };
