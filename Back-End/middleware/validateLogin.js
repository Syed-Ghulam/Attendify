const { validateRequired } = require("../utils/validation");

const validateLogin = (req, res, next) => {

    const { userId, password } = req.body;

    const userIdError = validateRequired(userId, "User ID");
    if (userIdError) {
        return res.status(400).json({
            message: userIdError
        });
    }

    const passwordError = validateRequired(password, "Password");
    if (passwordError) {
        return res.status(400).json({
            message: passwordError
        });
    }

    next();
};

module.exports = validateLogin;