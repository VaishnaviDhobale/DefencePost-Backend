const express = require("express");
const jwt = require("jsonwebtoken");
const forgetPasswordRoute = express.Router();
const { UserModel } = require("../models/userAuth.model");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
// const { UserModel } = require("../models/userAuth.model");
require("dotenv").config();

// See All block Users
forgetPasswordRoute.post("/sendPasswordResetEmail", async (req, res) => {
  const { email } = req.body;
  // console.log(email)

  try {
    // Generate a unique reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Find the user by email and save the reset token
    const user = await UserModel.findOne({ email });

    // console.log(user)
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let token = jwt.sign({ id: user._id }, "jwt_secret_key", {
      expiresIn: "1d",
    });
    // console.log(token);

    // nodemailer thing start
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gauravsaini760@gmail.com",
        pass: "owtl csap pvca ripz",
      },
    });

    const resetURL = `${process.env.live_url}/forgot-password/${user._id}/${token}`;
    const message = `
    <p>Hello,</p>

    <p>You have asked to reset your password for the Defencepost account associated with this email address (${user.email}).</p>
      
    <p>To reset the password, please click on the following link: </p>
      
    <a href=${resetURL}> ${resetURL} </a>
    
    <p>This password change link will expire in 10 min from the time this email was sent.</p>
      
    
    <p>If you didn't make the request, please ignore this email.</p>
      
    <p>Replies to this email are not monitored or answered.</p>
      
    <p>Thanks,</p>
      
    <p>Defencepost Team</p>
      
      
        
    <p>***This is an automatic notification. Replies to this email are not monitored or answered.</p>`;

    var mailOptions = {
      from: "gauravsaini760@gmail.com",
      to: email,
      subject: "Defencepost: Reset Password",
      html: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send("Error ocured");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Ok");
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// forgetPasswordRoute.post("/updatePassword/:id/:token", async(req,res)=>{
//   let {id,token} = req.params;
//   let password = req.body;
//   // console.log(id)

//   jwt.verify(token, "jwt_secret_key",(err,decoded)=>{
//     if(err){
//       return res.json("Error with token")
//     }else{
//       bcrypt.hash(password,5,(err,hash)=>{
//           if(err){

//             res.status(400).send("Something went wrong")
//           }else{
//             UserModel.findByIdAndUpdate({_id : id},{password : hash}).then(()=>{
//               res.status(200).send("Pasword updated successfully")
//             }).catch((err)=>{

//             })
//           }
//         })
//     }
//   })
// })

forgetPasswordRoute.post("/updatePassword/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body; // Get the password from the request body

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
    if (err) {
      // Handle token verification error
      console.error(err);
      res.status(400).json({ error: "Error with token" });
    } else {
      bcrypt.hash(password, 10, (hashErr, hash) => {
        // Increased the number of rounds to 10 for better security
        if (hashErr) {
          console.error(hashErr);
          res.status(400).json({ error: "Something went wrong" });
        } else {
          UserModel.findByIdAndUpdate({ _id: id }, { password: hash })
            .then(() => {
              res
                .status(200)
                .json({ message: "Password updated successfully" });
            })
            .catch((updateErr) => {
              console.error(updateErr);
              res.status(500).json({ error: "Password update failed" });
            });
        }
      });
    }
  });
});

module.exports = {
  forgetPasswordRoute,
};