const express = require("express");
const { CourseModel } = require("../models/course.model");
const courseRoute = express.Router();
const { connection1 } = require("../config/db");
const path = require("path");
const fs = require("fs");
const { adminAuth } = require("../middlewares/adminAuth.middleware");

// See All Course
courseRoute.get("/", async (req, res) => {
  try {
    const fieldsToInclude = [
      "name",
      "title",
      "price",
      "discount",
      "sellPrice",
      "description",
      "thumbnail",
      "previewPDF",
      "previewPDFName",
      "introVideo",
      "folders"
    ];
    const projection = {};
    fieldsToInclude.forEach((field) => {
      projection[field] = 1; // Include this field
    });

    const data = await CourseModel.find({}, projection);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

// See single course
courseRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  const authorId = id;
  console.log(id,"id")
  try {
    const data = await CourseModel.findById(authorId);

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ err });
  }
});

// Add course
courseRoute.post("/add", adminAuth, async (req, res) => {
  try {
    const {
      name,
      title,
      price,
      discount,
      sellPrice,
      description,
      thumbnail,
      previewPDF,
      previewPDFName,
      folders,
      introVideo,
    } = req.body;
    // const { name, title, price, discount, sellPrice, description,thumbnail,previewPDF,previewPDFName,coursePDF,coursePDFName,introVideo } = req.body;
    // const { name } = req.body;
    // console.log("ok")
    const course = new CourseModel({
      name: name,
      title: title,
      price: price,
      discount: discount,
      sellPrice: sellPrice,
      description: description,
      thumbnail: thumbnail,
      previewPDF: previewPDF,
      introVideo: introVideo,
      previewPDFName: previewPDFName,
      folders: folders,
    });
    await course.save();
    res.status(200).send({ msg: "Course Added Successfully!!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete course
courseRoute.delete("/delete/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await CourseModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Course Deleted Successfully!!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update/Patch course
courseRoute.patch("/patch/:id", adminAuth, async (req, res) => {
  // console.log(req.body)
  try {
    const { id } = req.params;
    await CourseModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Course Updated Successfully!!" });
  } catch (err) {
    res.status(400).send({ err });
  }
});

// Update/Put course
courseRoute.put("/put/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await CourseModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Course Updated Successfully!!" });
  } catch (err) {
    res.status(400).send({ err });
  }
});
// export
module.exports = {
  courseRoute,
};
