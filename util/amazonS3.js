var AWS = require("aws-sdk");
var fs = require("fs");
var path = require("path");
const mime = require("mime");

var s3bucket = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

exports.uploadImage = function (file, directory, callback) {
  console.log(file);
  var params = {
    Key: directory + "/" + Date.now() + path.extname(file.name),
    Body: file.data,
    Bucket: process.env.bucketName,
    ACL: "public-read-write",
    ContentType: mime.getType(path.extname(file.name)),
  };

  s3bucket.upload(params, function (err, uplodedfile) {
    if (err) {
      callback(err);
    } else {
      callback(null, uplodedfile);
    }
  });
};
