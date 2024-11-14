const express = require("express");
const { CourseReviewModel } = require("../models/courseReview.model");
const { connection1 } = require("../config/db");
const courseReviewRoute = express.Router();

// See All posts
courseReviewRoute.get("/", async (req, res) => {
  const db1 = connection1
  try {
    const data = await CourseReviewModel.find();
  // console.log(data)

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

// See single posts
courseReviewRoute.get("/:id", async(req,res)=>{
  const {id} = req.params;
  const authorId = id;
  try{
      const data = await CourseReviewModel.findById(authorId);
      res.status(200).send(data)
  }catch(err){
      res.status(400).send({err});
  }
});


// Add post
courseReviewRoute.post("/add", async (req, res) => {
  try {
    const { name,rating,date,review,courseId,email } =
      req.body;
    const reviewData = new CourseReviewModel({
      name,
      rating,
      review,
      date,
      courseId,
      email
    });
    await reviewData.save();
    res.status(200).send({ msg: "Review Added Successfully!!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete course review
courseReviewRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await CourseReviewModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Review Deleted Successfully!!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update/Patch review
courseReviewRoute.patch("/patch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await CourseReviewModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Post Updated Successfully!!" });
  } catch (err) {
    res.status(400).send({ err });
  }
});

// Update/Put review
courseReviewRoute.put("/put/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await CourseReviewModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Post Updated Successfully!!" });
  } catch (err) {
    res.status(400).send({ err });
  }
});
// export
module.exports = {
    courseReviewRoute,
};
