const mongoose = require("mongoose");
const { connection1 } = require("../config/db");

// payment Schema
const paymentSchema = mongoose.Schema({
  razorpay_payment_id :String,
  razorpay_order_id : String,
  razorpay_signature :String,  
  amount : Number,
  currency : String,
  status : String,
  method : String,
  bank : String,
  userName : String,
  userEmailId : String,
  courseName : String,
  courseId : String,
  date : Date,
  coupon : String
});

// Payment Model
const PaymentModel = connection1.model("paymentDetails", paymentSchema);

// export
module.exports = {
    PaymentModel,
};
