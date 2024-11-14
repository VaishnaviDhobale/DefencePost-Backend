const express = require("express");
const jwt = require("jsonwebtoken");
const { BlockUserModel } = require("../models/blockUsers.model");
const bcrypt = require("bcrypt");
const { connection1 } = require("../config/db");
const { adminAuth } = require("../middlewares/adminAuth.middleware");
const blockUserRoute = express.Router();

// See All block Users
blockUserRoute.get("/",  async (req, res) => {
  const db1 = connection1
  try {
    const data = await BlockUserModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

// add user to blocklist
blockUserRoute.post("/add", adminAuth, async (req, res) => {
  try {
    const { name, email, contact,userId} = req.body;
    const user = new BlockUserModel({ name, email, contact,userId });
    await user.save();
    res.status(200).send({ msg: "User Added In Block List Successfully!!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete Blocked user
blockUserRoute.delete("/delete/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await BlockUserModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "User Unblocked Successfully!!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// remove user from blockList

// export
module.exports = {
  blockUserRoute,
};
