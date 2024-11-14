const mongoose = require("mongoose");
const { connection1 } = require("../config/db");

// Post Schema
const postSchema = mongoose.Schema({
  heading: String,
  intro: String,
  readTime: String,
  date: String,
  category : String,
  tag : Array,
  content : String
});

// Post Model
const PostModel = connection1.model("post", postSchema);

// export
module.exports = {
  PostModel,
};
