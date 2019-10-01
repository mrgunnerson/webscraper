var express = require("express");
var router = express.Router();
var articleController = require('../controllers/article')
var scraperController = require('../controllers/scraper')
router.get("/", articleController.home);
router.get('/article/delete/:id', articleController.delete)
router.get("/scrape", scraperController.scrape);
module.exports = router;
