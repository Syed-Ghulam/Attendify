const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({
            message: "Access denied. Token missing."
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }
};

module.exports = verifyToken;