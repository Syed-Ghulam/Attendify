const validateRequired = (value, fieldName) => {
    if(!value || !value.toString().trim())
        return `${fieldName} is required`;

    return "";
};

const validateName = (value, fieldName) => {

    const requiredError = validateRequired(value, fieldName);

    if (requiredError)
        return requiredError;

    const nameRegex = /^[A-Za-z ]+$/;

    if (!nameRegex.test(value.trim()))
        return `${fieldName} can contain only alphabets`;

    return "";
};

const validateOptionalName = (value, fieldName) => {

    if (!value || !value.trim())
        return "";

    const nameRegex = /^[A-Za-z ]+$/;

    if (!nameRegex.test(value.trim()))
        return `${fieldName} can contain only alphabets`;

    return "";
};

const validateEmail = (value) => {

    const requiredError = validateRequired(value, "Email");

    if (requiredError)
        return requiredError;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value.trim()))
        return "Invalid Email Address";

    return "";
};

const validatePhone = (value) => {

    const requiredError = validateRequired(value, "Phone Number");

    if (requiredError)
        return requiredError;

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(value.trim()))
        return "Phone Number must be exactly 10 digits";

    return "";
};

const validateSelect = (value, fieldName) => {
    return validateRequired(value, fieldName);
};

const validateDob = (value) => {

    const requiredError = validateRequired(value, "Date of Birth");

    if (requiredError)
        return requiredError;

    const selectedDate = new Date(value);
    const today = new Date();

    // Remove time part from today's date
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today)
        return "Date of Birth cannot be in the future";

    return "";
};

module.exports = {
    validateRequired,
    validateName,
    validateOptionalName,
    validateEmail,
    validatePhone,
    validateSelect,
    validateDob
};