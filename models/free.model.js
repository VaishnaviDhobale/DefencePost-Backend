const mongoose = require("mongoose");
const { connection1 } = require("../config/db");

// Post Schema
const freeSchema = mongoose.Schema({
  thumbnail: String,
  name: String,
  freePdf: [String],
  freePdfName: [String],
});

// Post Model
const FreeModel = connection1.model("free", freeSchema);

// export
module.exports = {
    FreeModel,
};
