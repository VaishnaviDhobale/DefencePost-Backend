
const express = require("express");
const fileRoute = express.Router();
const path = require("path");
const fs = require('fs');


fileRoute.get('/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join("/Users/Vaishu/Desktop/Defence Post/backend", 'uploads', fileName);
  
    console.log(filePath)
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Serve the file with appropriate headers
      res.sendFile(path.resolve(filePath));
    //   res.send("ok")
    } else {
      res.status(404).send('File not found');
    }
  });

  module.exports = {
    fileRoute
  }