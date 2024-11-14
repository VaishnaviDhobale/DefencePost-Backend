const express = require("express");
const Razorpay = require("razorpay");
const { PaymentModel } = require("../models/payment.model");

// const instance = require("../index.js")

const paymentRouter = express.Router();

// rezorpay instance
// const instance = new Razorpay({
//   key_id: process.env.razorpay_api_key,
//   key_secret: process.env.razorpay_api_secret,
// });
paymentRouter.post("/checkout", async (req, res) => {
  const { amount } = req.body;
  // console.log( typeof +amount)
  // Verify that the amount is a valid number
  if (typeof +amount !== 'number' || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ msg: "Invalid 'amount' parameter" });
  }


  try {

    const options = {
      amount: Math.round(amount * 100), // Convert to the smallest currency unit
      currency: "INR",
    };
    
    // Make sure to use the correct API keys here

    const instance = new Razorpay({
      key_id: process.env.razorpay_api_key,
      key_secret: process.env.razorpay_api_secret,
    });


    const order = await instance.orders.create(options);


    // console.log(order,"order")

    res.status(200).json({ msg: "Payment order created successfully", order });
  } catch (err) {
    console.error(err,"heret");
    res.status(500).json({ msg: "An error occurred while creating the payment order" });
  }
});

// Adding payment detail into database
paymentRouter.post("/addDetails",async(req,res)=>{
  try{
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,  
      amount,
      currency,
      status,
      method,
      bank,
      userName,
      userEmailId,
      courseName,
      courseId,
      coupon
    } = req.body.detailsObj;
    
    const detials = new PaymentModel({
      razorpay_payment_id : razorpay_payment_id,
      razorpay_order_id : razorpay_order_id,
      razorpay_signature : razorpay_signature,  
      amount : amount,
      currency : currency,
      status : status,
      method : method,
      bank : bank,
      userName : userName,
      userEmailId : userEmailId,
      courseName : courseName,
      courseId : courseId,
      date : new Date() ,
      coupon : coupon
    });

    // console.log(detials)
    await detials.save();
    res.status(200).send({ msg: "Payment details Added Successfully!!" });
  }catch(err){
    res.status(500).json({ msg: "An error occurred while adding details" });
  }
})
paymentRouter.post("/check", async (req, res) => {
  console.log(req, "Everything is ok")
   try{
    console.log(req.body,"check")
    res.status(200).send({ msg: "Payment done successfully" });
   }catch(err){
    console.log(err)
   }
});

paymentRouter.get("/getKey", async (req, res) => {
  // console.log(process.env.razorpay_api_key)
    res.status(200).send(process.env.razorpay_api_key);
});

paymentRouter.get("/getSecretKey", async (req, res) => {
  // console.log(process.env.razorpay_api_secret)
    res.status(200).send(process.env.razorpay_api_secret);
});

// get payment deatis 

paymentRouter.get("/paymentDetails", async (req, res) => {
   try{
   let details = await PaymentModel.find();
    res.status(200).send({ msg: "Data captured",details });
   }catch(err){
    console.log(err)
   }
});


// export
module.exports = {
  paymentRouter,
};
