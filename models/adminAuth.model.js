const mongoose = require("mongoose");
const { connection1 } = require("../config/db");

// Admin Schema
const adminSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  contact: String,
});

// Admin Model
const AdminModel = connection1.model("adminAuth", adminSchema);

//export
module.exports = {
  AdminModel,
};
