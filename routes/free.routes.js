const express = require("express");
const { FreeModel } = require("../models/free.model");
const { connection1 } = require("../config/db");
const { adminAuth } = require("../middlewares/adminAuth.middleware");
const freeRoute = express.Router();

// See All free content
freeRoute.get("/", async (req, res) => {
  const db1 = connection1
  try {
    const data = await FreeModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

// See single freeData
freeRoute.get("/:id", async(req,res)=>{
  const {id} = req.params;
  const authorId = id;
  try{
      const data = await FreeModel.findById(authorId);
      res.status(200).send(data)
  }catch(err){
      res.status(400).send({err});
  }
});

// Add free content
freeRoute.post("/add", adminAuth, async (req, res) => {
  try {
    const {name,thumbnail,freePdf,freePdfName} =
      req.body;
      console.log(req.body)

    const free = new FreeModel({
      name : name,
      thumbnail :thumbnail,
      freePdf : freePdf,
      freePdfName : freePdfName,
    });
    await free.save();
    res.status(200).send({ msg: "Free content Added Successfully!!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete free content
freeRoute.delete("/delete/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await FreeModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Free content Deleted Successfully!!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update/Patch free content
freeRoute.patch("/patch/:id",  adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await FreeModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Free content Updated Successfully!!" });
  } catch (err) {
    res.status(400).send({ err });
  }
});

// Update/Put free content
freeRoute.put("/put/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await FreeModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Free content Updated Successfully!!" });
  } catch (err) {
    res.status(400).send({ err });
  }
});
// export
module.exports = {
  freeRoute,
};
