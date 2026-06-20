const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
 
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage,

    limits:{
        fileSize: 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ];

        if(allowedTypes.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error("Only JPG , JPEG and PNG files are allowed."));
        }
    }
});

module.exports = upload;