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
function get(req, res) {
  Article.find({ _id: req.params.id }, function(err, result) {
    if (err) {
      return err;
    }
    console.log(result);
    res.render("article", result[0]);
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
function addComment(req, res) {
  console.log(req.body);
  console.log(req.params);
  Article.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: { comment: req.body.comment } } },
    {new: true},
    function(err, result) {
      console.log(result);
      if (err) {
        return err;
      }
      res.render("article", result);
    }
  );
}
function deleteComment(req, res) {
  console.log(req.params)
  Article.findByIdAndUpdate(
    req.params.id,
    { $pull: { comments: { comment: req.params.commentid } } },
    {new: true},
    function(err, result) {
      console.log(result);
      if (err) {
        return err;
      }
      res.render("article", result);
    }
  );
}
module.exports = { home: home, delete: del, get: get, addComment: addComment, deleteComment: deleteComment };

/*
[ { _id: 5d8c291ce82413d2fa7b94e8,
  title:
   'Julián Castro calls for compassion, resources in Oakland homeless camp tour',
  summary:
   '\n    \t\t\t Democratic presidential candidate Julián Castro toured a homeless camp near a Home Depot in Oakland on Wednesday and said more resources are needed in providing affordable housing. \n\t',
  __v: 0 }]
  */
