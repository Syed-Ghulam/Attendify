const {
    validateRequired,
    validateName,
    validateOptionalName,
    validateEmail,
    validatePhone,
    validateSelect,
    validateDob
} = require("../utils/validation");

const validateUser = (req, res, next) => {

    const {
        userId,
        groupName,
        firstName,
        lastName,
        dob,
        gender,
        phone,
        email
    } = req.body;

    const userIdError = validateRequired(userId, "User ID");
    if (userIdError)
        return res.status(400).json({ message: userIdError });

    const groupError = validateSelect(groupName, "Group");
    if (groupError)
        return res.status(400).json({ message: groupError });

    const firstNameError = validateName(firstName, "First Name");
    if (firstNameError)
        return res.status(400).json({ message: firstNameError });

    const lastNameError = validateOptionalName(lastName, "Last Name");
    if (lastNameError)
        return res.status(400).json({ message: lastNameError });

    const dobError = validateDob(dob);
    if (dobError)
        return res.status(400).json({ message: dobError });

    const genderError = validateSelect(gender, "Gender");
    if (genderError)
        return res.status(400).json({ message: genderError });

    const phoneError = validatePhone(phone);
    if (phoneError)
        return res.status(400).json({ message: phoneError });

    const emailError = validateEmail(email);
    if (emailError)
        return res.status(400).json({ message: emailError });

    next();
};

module.exports = validateUser;