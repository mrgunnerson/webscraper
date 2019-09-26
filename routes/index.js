var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var router = express.Router();
var Article = require("../models/article");
router.get("/scrape", (req, res) => {
  axios
    .get("https://www.sfchronicle.com/elections/")
    .then(function(response) {
      // handle success
      var $ = cheerio.load(response.data);
      var article = $(
        "#content > div.right-rail > div.zone.zone-5.wide-only > div.hide-rss-link.hdnce-e.hdnce-collection-74575-premium_headlinelist_illus > div > div:nth-child(2)"
      );
      console.log(article.find("h2 a").text());
      console.log(article.find("p span").text());
      var document = new Article({
        title: article.find("h2 a").text(),
        summary: article.find("p span").text()
      });
      document.save();
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
  res.send("okay");
});

module.exports = router;
