var express = require("express");
var router = express.Router();
var articleController = require('../controllers/article')
var scraperController = require('../controllers/scraper')
router.get("/", articleController.home);
router.get('/article/:id', articleController.get)
router.get('/article/delete/:id', articleController.delete)
router.post('/comment/:id', articleController.addComment)
router.get('/comment/:id/delete/:commentid', articleController.deleteComment)
router.get("/scrape", scraperController.scrape);
module.exports = router;
