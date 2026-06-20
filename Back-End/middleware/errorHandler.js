const multer = require("multer");

const errorHandler = (err, req, res, next) => {

    console.error(err);

    if(err instanceof multer.MulterError){
        if(err.code === "LIMIT_FILE_SIZE"){
            return res.status(400).json({
                message: "Image size must be less than 1 MB"
            });
        }

        return res.status(400).json({
            message: err.message
        });
    }

    if (err.message === "Only JPG, JPEG and PNG files are allowed.") {

        return res.status(400).json({
            message: err.message
        });

    }

    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });

};

module.exports = errorHandler;