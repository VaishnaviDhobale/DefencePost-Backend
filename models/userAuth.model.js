const mongoose = require("mongoose");
const { connection1 } = require("../config/db");

// User Schema
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  contact: String,
});

// User Model
const UserModel = connection1.model("userAuth", userSchema);

// export
module.exports = {
  UserModel,
};
