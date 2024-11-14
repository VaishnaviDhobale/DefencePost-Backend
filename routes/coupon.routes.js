const express = require("express");
const { CouponModel } = require("../models/coupon.model");
const { connection1 } = require("../config/db");
const couponRoute = express.Router();
const { v4: uuidv4 } = require('uuid');
const { adminAuth } = require("../middlewares/adminAuth.middleware");


// See All Course
couponRoute.get("/", async (req, res) => {
  const db1 = connection1
  try {
    const data = await CouponModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

// See single course
couponRoute.get("/:id", async(req,res)=>{
  const {id} = req.params;
  const authorId = id;
  try{
      const data = await CouponModel.findById(authorId);
      res.status(200).send(data)
  }catch(err){
      res.status(400).send({err});
  }
});

// Add course
couponRoute.post("/add", adminAuth, async (req, res) => {
  try {
    // console.log(req.body)
    const { coupon, studentDiscount, promoterCommission} = req.body;
    // console.log(coupon)
    const course = new CouponModel({
        coupon : coupon,
        studentDiscount : studentDiscount,
        promoterCommission : promoterCommission,
        promoterId : uuidv4(),
        promoterAmount : 0,
        studentsCount : 0
    });
    await course.save();
    res.status(200).send({ msg: "Coupon Added Successfully!!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete course
couponRoute.delete("/delete/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await CouponModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Coupon Deleted Successfully!!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update/Patch course
couponRoute.patch("/patch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await CouponModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Coupon Updated Successfully!!" });
  } catch (err) {
    res.status(400).send({ err });
  }
});

// Update/Put course
couponRoute.put("/put/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await CouponModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Coupon Updated Successfully!!" });
  } catch (err) {
    res.status(400).send({ err });
  }
});
// export
module.exports = {
    couponRoute,
};
