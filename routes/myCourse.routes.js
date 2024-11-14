const express = require("express");
const { MyCourseModel } = require("../models/myCourse.model");
const { userAuth } = require("../middlewares/userAuth.middleware");
const { adminAuth } = require("../middlewares/adminAuth.middleware");

const myCourseRoute = express.Router();

myCourseRoute.get("/", userAuth, async (req, res) => {
  try {
    const data = await MyCourseModel.find({ authorId: req.body.authorId });
    // console.log(req.body.authorId,"authorId");
    res.status(200).send({ data, totalData: data.length });
  } catch (err) {
    res.status(400).send({ err });
  }
});

myCourseRoute.get("/:id", userAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const data = await MyCourseModel.findById({ _id: id });
    console.log(typeof data.length);
    res.status(200).send({ data, totalData: data.length });
  } catch (err) {
    res.status(400).send({ err });
  }
});

// add product into the my course
myCourseRoute.post("/add", userAuth, async (req, res) => {
  try {
    console.log(req.body, "post body");
    const prod = new MyCourseModel(req.body);
    await prod.save();
    res.status(200).send({ msg: "Course added to My Course" });
  } catch (err) {
    res.status(400).send({ err });
  }
});

// // Delete product
// myCourseRoute.delete("/delete/:id", adminAuth, async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(id, "id from my course delete");
//     const user = await MyCourseModel.findOne({ courseId: id });
//     // if (req.body.authorId === user.authorId) {
//     await MyCourseModel.findByIdAndDelete({ courseId: id });
//     res.status(200).send({ msg: "Product deleted from My Course" });
//     // } else {
//     //   res.status(400).send({ err: "You are not a authorized person." });
//     // }
//   } catch (err) {
//     res.status(400).send({ err });
//   }
// });

// Delete product
myCourseRoute.delete("/delete/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id from my course delete");

    // Use findOneAndDelete with the courseId as a query
    const result = await MyCourseModel.findOneAndDelete({ courseId: id });

    if (result) {
      res.status(200).send({ msg: "Product deleted from My Course" });
    } else {
      res.status(404).send({ msg: "Product not found in My Course" });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
});

myCourseRoute.delete("/deleteAll", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    // const user = await MyCourse.findOne({_id : id})
    // if(req.body.authorId === user.authorId){
    await MyCourseModel.deleteMany({});
    res.status(200).send({ msg: "Course deleted" });
    // }else{
    // res.status(400).send({err : "You are not a authorized person."});
    // }
  } catch (err) {
    res.status(400).send({ err });
  }
});

myCourseRoute.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const user = await MyCourseModel.findOne({courseId : id})
    console.log(req.body);
    await MyCourseModel.findByIdAndUpdate({ courseId: id }, req.body);
    res.status(200).send({ msg: "My Course Updated" });
  } catch (err) {
    res.status(400).send({ err });
  }
});

// Update/Put course
myCourseRoute.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Exclude the _id field from the update using $unset
    const { _id, ...updatedData } = req.body;
    console.log(updatedData);

    // Use findOneAndUpdate with lean() to avoid _id modification issue
    const result = await MyCourseModel.updateMany(
      { courseId: id },
      { $set: updatedData },
      { upsert: true }
    );

    console.log(result);

    res.status(200).send({ msg: "Mycourse Updated Successfully!!" });
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(400).send({ err });
  }
});

// export
module.exports = {
  myCourseRoute,
};
