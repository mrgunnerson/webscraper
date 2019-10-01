var Article = require("../models/article");
function home(req, res) {
  Article.find(function(err, results) {
    if (err) {
      return err;
    }
    console.log(results);
    res.render("home", { articles: results });
  });
}
function del(req, res) {
  Article.deleteOne({ _id: req.params.id }, function(err) {
    if (err) {
      return err;
    }
    res.redirect("/");
  });
}
module.exports = { home: home, delete: del };

/*
[ { _id: 5d8c291ce82413d2fa7b94e8,
  title:
   'Julián Castro calls for compassion, resources in Oakland homeless camp tour',
  summary:
   '\n    \t\t\t Democratic presidential candidate Julián Castro toured a homeless camp near a Home Depot in Oakland on Wednesday and said more resources are needed in providing affordable housing. \n\t',
  __v: 0 }]
  */
