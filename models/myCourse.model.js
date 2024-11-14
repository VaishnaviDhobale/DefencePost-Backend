const mongoose = require("mongoose");
const { connection1 } = require("../config/db");

// Cart Schema
const myCourseSchema = mongoose.Schema({
  CourseName: String,
  title: String,
  price: String,
  discount: String,
  sellPrice: String,
  thumbnail: String,
  previewPDF: Array,
  previewPDFName: Array,
  folders: Array,
  courseId : String,
  authorId :String
});

// Cart Model
const MyCourseModel = connection1.model("myCourse", myCourseSchema);

// export
module.exports = {
  MyCourseModel,
};
