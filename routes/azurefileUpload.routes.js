const express = require("express");
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/userAuth.model");
const bcrypt = require("bcrypt");
const { connection1 } = require("../config/db");

const azureuploadRoute = express.Router();
// const fileUpload = require('express-fileupload');
const azureStorage = require("azure-storage");
// import azureStorage from "azure-storage";
const {intoStream} = require("into-stream");
// import intoStream from "into-stream";
// import dotenv from "dotenv";
// import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
const blobService = azureStorage.createBlobService(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );
  azureuploadRoute.post("/blobupload", (req, res) => {
    if (!req.files) {
      return res.status(400).send("No files are received.");
    }
  
    // 11.1.
    const blobName = req.files.file.name;
    console.log(`Blob Name ${blobName}`);
    // 11.2.
    const stream = intoStream(req.files.file.data);
    console.log(`stream ${stream}`);
    // 11.3.
    const streamLength = req.files.file.data.length;
    console.log(`Length ${streamLength}`);
    // 11.4.
    blobService.createBlockBlobFromStream(
      containerName,
      blobName,
      stream,
      streamLength,
      (err) => {
        if (err) {
          response.status(500);
          response.send({ message: "Error Occured", error: err });
          return;
        }
  
        response
          .status(200)
          .send({ message: "File Uploaded Successfully", res: response });
      }
    );
  });

  azureuploadRoute.get("/", async (req, res) => {
    const db1 = connection1
    try {
      const data = await UserModel.find();
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // User Registration
  azureuploadRoute.post("/upload-file", (req, res) => {
    try {
      const { name, email, password, contact } = req.body;
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = new UserModel({ name, email, password: hash, contact });
        await user.save();
        res.status(200).send({ msg: "User Added Successfully!!" });
      });
    } catch (err) {
      res.status(400).send(err);
    }
  });

  // export
module.exports = {
  azureuploadRoute,
  };