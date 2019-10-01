var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title:  String,
  summary: String,
  url: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article
