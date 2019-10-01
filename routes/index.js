var express = require("express");
var router = express.Router();
var renderRoutes = require('./renderRoutes')
router.use('/', renderRoutes)
module.exports = router;
