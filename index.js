

// const express = require("express");
// const cors = require("cors");
// const upload = require("./middlewares/upload.js")
// const connection = require("./config/db");
// const { adminRoute } = require("./routes/adminAuth.routes");
// const { userRoute } = require("./routes/userAuth.routes");
// const { postRoute } = require("./routes/post.routes");
// const { courseRoute } = require("./routes/course.routes");
// const { freeRoute } = require("./routes/free.routes");
// const { courseReviewRoute } = require("./routes/courseReview.routes.js");
// const Razorpay = require("razorpay")
// const {paymentRouter} = require("./routes/payment.routes.js");
// const { couponRoute } = require("./routes/coupon.routes.js");
// const { blockUserRoute } = require("./routes/blockUser.routes.js");
// const { myConnection } = require("./config/db") ;
// // const multer = require('multer');


// require ("dotenv").config();


// // razorpay 
 




// const app = express();
// const app2 = express();
// app.use(cors());
// app.use(express.json());
// app.use("/admin",adminRoute);
// app.use("/user",userRoute);
// app.use("/payment",paymentRouter)
// app.use("/coupon",couponRoute)
// app.use("/block",blockUserRoute)


// app.use("/post",postRoute)
// app.use("/course",upload.fields([
//     { name: "thumbnail", maxCount: 1 },
//     { name: "previewPDF", maxCount: 1 },
//     { name: "coursePDF", maxCount: 1 },
//     { name: "introVideo", maxCount: 1 },
//   ]),courseRoute)

// app.use("/review",courseReviewRoute)
// app.use("/free",upload.fields([
//   { name: "thumbnail", maxCount: 1 },
//   { name: "freePdf", maxCount: 1 },
// ]), freeRoute)



// app.listen(process.env.port,async()=>{
//     try{
//         await connection;
//         console.log("Connected with database!!");
//     }catch(err){
//         console.log(err);
//     }

//     console.log(`Server running on port ${process.env.port}!!`);

// });

// new code 
const express = require("express");
const cors = require("cors");
const upload = require("./middlewares/upload.js");
const { connection1, connection2 } = require("./config/db");
const { adminRoute } = require("./routes/adminAuth.routes");
const { userRoute } = require("./routes/userAuth.routes");
const { postRoute } = require("./routes/post.routes");
const { courseRoute } = require("./routes/course.routes");
const { freeRoute } = require("./routes/free.routes");
const { courseReviewRoute } = require("./routes/courseReview.routes.js");
const Razorpay = require("razorpay");
const { paymentRouter } = require("./routes/payment.routes.js");
const { couponRoute } = require("./routes/coupon.routes.js");
const { blockUserRoute } = require("./routes/blockUser.routes.js");
const { dataHubRoute } = require("./routes/dataHub.routes.js");
const { forgetPasswordRoute } = require("./routes/forgotPassword.routes.js");
const { fileRoute } = require("./routes/accessFiles.routes.js");
const { myCourseRoute } = require("./routes/myCourse.routes.js");
const { uploadRoute } = require("./routes/fileUpload.routes.js");
const path = require('path');

require("dotenv").config();
// Serve static files from the React app


const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/payment", paymentRouter);
app.use("/coupon", couponRoute);
app.use("/block", blockUserRoute);
app.use("/datahub",dataHubRoute)
app.use("/post", postRoute);
app.use("/files", fileRoute);
app.use("/forgetpassword", forgetPasswordRoute);
app.use("/mycourse", myCourseRoute);
app.use("/file-upload", uploadRoute);

// this is a updated one 
app.use("/course",courseRoute)
app.use("/review", courseReviewRoute);
app.use("/free",freeRoute)




// Serve static files from the user React app
app.use(express.static(path.join(__dirname, '../defencepost-user/build')));

// Serve static files from the admin React app
app.use('/dp-admin', express.static(path.join(__dirname, '../defencepost-admin/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../defencepost-user/build', 'index.html'));
});

// Handle admin React routing
app.get('/dp-admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../defencepost-admin/build', 'index.html'));
});

app.listen(process.env.PORT, async() => {
  try {
    // You can use connection1 and connection2 as your database connections
    await connection1;
    await connection2;
    console.log("Connected with databases!!");
  } catch (err) {
    console.log(err);
  }

  console.log(`Server running on port ${process.env.PORT}!!`);
});
