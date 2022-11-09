const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const filesPayloadExists = require('./middleware/filesPayloadExists')
const fileSizeLimiter = require('./middleware/fileSizeLimiter')
const fileExtLimiter = require('./middleware/fileExtLimiter')
const upload = require('./controller/upload')
const app = express();
const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//! as most of fileUpload middleware works only for a single file so we will create our own middleware

//^ 1) Automatically creates the directory path specified in .mv(filePathName) to be able to save it locally along with adding the file to req.files
//^ 2) It is going to see if we have supplied the files or not
//^ 3) It will receive a parameter of the allowed file extensions that we want
//^ 4) It is going to check if any of file has bigger size than we want
//^ 5) call the controller which saved each file to the server

app.post("/upload", fileUpload({ createParentPath: true }) , filesPayloadExists,
        fileExtLimiter('.png', '.jpg', '.jpeg'), fileSizeLimiter, upload)

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));