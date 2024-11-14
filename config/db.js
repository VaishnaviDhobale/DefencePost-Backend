
// const mongoose = require("mongoose");
// require ("dotenv").config()

// const connection = mongoose.connect(process.env.mongoUrl);



// module.exports = {
//     connection,
// }



// My new code 
const mongoose = require("mongoose");
require("dotenv").config();

// Define MongoDB URIs for your two databases
const mongoUri1 = process.env.MongoUrl; // Replace with your first MongoDB connection string
const mongoUri2 = "mongodb+srv://vaishnavidhobale5:vaishnavi@cluster0.gdkapdl.mongodb.net/DefencePostDataHub?retryWrites=true&w=majority"; // Replace with your second MongoDB connection string

// Create separate connections for each database
const connection1 = mongoose.createConnection(mongoUri1, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection2 = mongoose.createConnection(mongoUri2, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Listen for connection events
connection1.on("connected", () => {
  console.log("Connected to MongoDB 1");
});

connection2.on("connected", () => {
  console.log("Connected to MongoDB 2");
});

connection1.on("error", (err) => {
  console.error("Error connecting to MongoDB 1:", err);
});

connection2.on("error", (err) => {
  console.error("Error connecting to MongoDB 2:", err);
});

module.exports = {
  connection1,
  connection2,
};
