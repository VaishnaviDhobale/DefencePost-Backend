const mongoose = require("mongoose");
const {connection1} = require("../config/db");
// const {folderSchema} = require("./folder.model");
// Course Schema
const contentSchema = new mongoose.Schema({
  coursePDFName: String,
  coursePDF: String,
});

const folderSchema = new mongoose.Schema({
  name: String,
  contents: [contentSchema],
});

const courseSchema = mongoose.Schema({
  name: String,
  title: String,
  price: String,
  discount: String,
  sellPrice : String,
  description : String,
  thumbnail : String,
  previewPDFName :[String],
  previewPDF :[String],
  folders: [folderSchema],
  introVideo :String,                                       
});

// Course Model
const CourseModel = connection1.model("course", courseSchema);

// export
module.exports = {
    CourseModel,
};
