const express = require('express');
const router = express.Router();
const path = require('path');
const product = require('../controllers/controller')
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const { WellArchitected } = require('aws-sdk');

const s3 = new S3Client({
    credentials: {

         accessKeyId: '', 
        secretAccessKey: ''
    },
    region: "ap-southeast-1" // this is the region that you select in AWS account
})

const s3Storage = multerS3({
    
    s3: s3, // s3 instance
    bucket: "myfirstbuccketttt", // change it as per your project requirement
    acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        if(!file)
        {
            res.status(400).json({ message: 'Please upload an image' });
        }
        console.log("Metadtaaa")
        cb(null, {fieldname: file.fieldname})
    },
    key: (req, file, cb) => {
        const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
        cb(null, fileName);
    }
});
function sanitizeFile(file, cb) {
    // Define the allowed extension
    const fileExts = [".png", ".jpg", ".jpeg", ".gif", ".pdf"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");
    console.log("AJSBHJASSA")
    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
}

// our middleware
const uploadImage = multer({
    storage: s3Storage,
    fileFilter: (req, file, callback) => {
        console.log("HEREEEE")
        sanitizeFile(file, callback)
    },
    limits: {
        fileSize: 1024 * 1024 * 20 // 20mb file size
    }
})

module.exports = uploadImage;

//Get Only One Product 
router.get("/productList", product.getListOfProducts);

//Get One Product From All
router.get("/getProduct/:id", product.getProduct);

//Add One Product In Database
router.post("/createProduct",uploadImage.single('image'), product.createProduct);

//Upload Product Image Based on Id
router.put("/upload/:id",uploadImage.single("image"), product.uploadProductImage);

//Edit/Update The Product Data 
router.patch("/update/:id", uploadImage.single('image'),product.updateProduct);


module.exports = router;


