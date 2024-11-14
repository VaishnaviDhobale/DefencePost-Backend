const mongoose = require("mongoose");
const { connection1 } = require("../config/db");

// courseReview Schema
const courseReviewSchema = mongoose.Schema({
  name: String,
  rating: String,
  date: String,
  review: String,
  courseId : String,
  email : String
});

// Admin Model
const CourseReviewModel = connection1.model("courseReview", courseReviewSchema);

//export
module.exports = {
    CourseReviewModel,
};
