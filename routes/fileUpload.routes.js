const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const fs = require("fs");
const url = require("url");
const uploadRoute = express.Router();
const { userAuth } = require("../middlewares/userAuth.middleware");

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "us-east-1",
});

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the route to handle file uploads
uploadRoute.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  const fileName = req.file.originalname;

  // Specify the S3 bucket name and key (file path in the bucket)
  const bucketName = "defencepost";

  // Remove spaces and special characters from the original file name
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "");

  // Create a unique key using the current date and time and sanitized file name
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .replace(/:/g, "-")
    .substring(0, 19);
  const key = `uploads/${formattedDate}_${sanitizedFileName}`;

  // Create parameters for S3 upload
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  // Upload the file to S3
  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error uploading file to S3", success: 0, fileUrl:"" });
    }

    // Optionally, you can delete the local file buffer after upload
    // fs.unlinkSync(file.path);

    // Return the S3 URL of the uploaded file
    const fileUrl = data.Key || data.key;
    res
      .status(200)
      .json({ message: "File uploaded successfully", success: 1, fileUrl: fileUrl });
  });
});

uploadRoute.get("/geturl/:fileName", userAuth, (req, res) => {
  const fileName = req.params.fileName;

  // Specify the S3 bucket name and key
  const bucketName = "defencepost";
  const key = `uploads/${fileName}`;

  // Generate a signed URL that expires in 5 minutes
  const signedUrl = s3.getSignedUrl("getObject", {
    Bucket: bucketName,
    Key: key,
    Expires: 300,
  });

  const parsedUrl = url.parse(signedUrl, true);

  const awsAccessKeyId = parsedUrl.query.AWSAccessKeyId;
  const expires = parsedUrl.query.Expires;
  const signature = parsedUrl.query.Signature;

  res.status(200).json({
    // fileUrl: signedUrl,
    fileName: key,
    accessKeyId: awsAccessKeyId,
    expires: expires,
    signature: signature,
  });
});

// export
module.exports = {
  uploadRoute,
};
