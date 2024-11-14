const express = require("express");
const jwt = require("jsonwebtoken");
const {DataHubModel} = require("../models/dataHub.model");
const bcrypt = require("bcrypt");
const { connection2 } = require("../config/db");
const dataHubRoute = express.Router();

// See All block Users
dataHubRoute.get("/", async (req, res) => {
  const db1 = connection2
  try {
    const data = await DataHubModel.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

// add user to blocklist
dataHubRoute.post("/add", async (req, res) => {
//   console.log(req.body)
  try {
    const { name, sale} = req.body;
    const user = new DataHubModel({ name, sale });
    await user.save();
    res.status(200).send({ msg: "data added to database 2" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete Blocked user
dataHubRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await DataHubModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "data delete from databse2" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// remove user from blockList

// export
module.exports = {
    dataHubRoute,
};
