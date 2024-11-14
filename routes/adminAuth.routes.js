const express = require("express");
const jwt = require("jsonwebtoken")
const { AdminModel } = require("../models/adminAuth.model");
const bcrypt = require("bcrypt");
const { adminAuth } = require("../middlewares/adminAuth.middleware");
const { connection1 } = require("../config/db");
const adminRoute = express.Router();

// See All Admins
adminRoute.get("/", async (req, res) => {
  const db1 = connection1
  try {
    const data = await AdminModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({err});
  }
});

// Admin Registration
adminRoute.post("/add", adminAuth, (req, res) => {
  try {
    const { name, email, password, contact } = req.body;
    bcrypt.hash(password, 5, async (err, hash) => {
      const admin = new AdminModel({ name, email, password: hash, contact });
      await admin.save();
      res.status(200).send({ msg: "Admin Added Successfully!!" });
    });
  } catch (err) {
    res.status(400).send({err});
  }
});


// Admin Login;
adminRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.find({ email });
    bcrypt.compare(password, admin[0].password, (err, pass) => {
      if (pass) {
        const token = jwt.sign({test : "EZ1"}, "EZ")
        res.status(200).send({ msg: "Login Successfull!!", token});
      } else {
        res.status(200).send({ err: "Wrong Details" });
      }
    });
  } catch (err) {
    res.status(400).send({err});
  }
});

// export
module.exports = {
  adminRoute,
};
