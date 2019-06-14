const express = require("express");
const path = require('path');
const AWS = require('aws-sdk');
const fs = require('fs');
const app = express();
require('dotenv').config();

// configuring aws
AWS.config.update({
  accessKeyId: process.env.access_key_id,
  secretAccessKey: process.env.secret_access_key
});
const s3 = new AWS.S3();

const filePath = "./data.txt";

// configuring parameters
const params = {
  Bucket: process.env.bucket_name,
  Body: fs.createReadStream(filePath),
  Key: "s3-nodejs-demo/" + Date.now() + "_" + path.basename(filePath)
};

// uploading file to the bucket
s3.upload(params, (err, data) => {
  if (err) {
    console.log("Error", err);
  }
  else if (data) {
    console.log("Uploaded in:", data.Location);
  }
});

app.listen(process.env.port, (err) => {
  if (err) {
    console.log("Error in running server");
    return;
  }
  console.log(`Server is up and running on http://localhost:${process.env.port}`);
});
