const express = require("express");
const { PostModel } = require("../models/posts.model");
const { connection1 } = require("../config/db");
const { adminAuth } = require("../middlewares/adminAuth.middleware");
const postRoute = express.Router();

// See All posts
postRoute.get("/", async (req, res) => {
  const db1 = connection1
  try {
    const data = await PostModel.find();
  // console.log(data)

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

// See single posts
postRoute.get("/:id", async(req,res)=>{
  const {id} = req.params;
  const authorId = id;
  try{
      const data = await PostModel.findById(authorId);
      res.status(200).send(data)
  }catch(err){
      res.status(400).send({err});
  }
});


// Add post
postRoute.post("/add", adminAuth, async (req, res) => {
  try {
    const { heading, intro, readTime, date, category, tag, content } =
      req.body;
    const post = new PostModel({
      heading,
      intro,
      readTime,
      date,
      category,
      tag,
      content,
    });
    await post.save();
    res.status(200).send({ msg: "Post Added Successfully!!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete post
postRoute.delete("/delete/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await PostModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Post Deleted Successfully!!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update/Patch Product
postRoute.patch("/patch/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Post Updated Successfully!!" });
  } catch (err) {
    res.status(400).send({ err });
  }
});

// Update/Put Product
postRoute.put("/put/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Post Updated Successfully!!" });
  } catch (err) {
    res.status(400).send({ err });
  }
});
// export
module.exports = {
  postRoute,
};
