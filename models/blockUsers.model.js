const mongoose = require("mongoose");
const { connection1 } = require("../config/db");

// User Schema
const blockUserSchema = mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  userId : String
});

// User Model
const BlockUserModel = connection1.model("blockUsers", blockUserSchema);

// export
module.exports = {
    BlockUserModel,
};
