const mongoose = require("mongoose");
const { connection2 } = require("../config/db");

// User Schema
const dataHbSchema = mongoose.Schema({
  name: String,
  sale : String
});

// User Model
const DataHubModel = connection2.model("datahub", dataHbSchema);

// export
module.exports = {
    DataHubModel,
};
