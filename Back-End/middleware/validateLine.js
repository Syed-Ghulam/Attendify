const {
    validateRequired,
    validateSelect
} = require("../utils/validation");

const validateLine = (req, res, next) => {

    const {
        lineNameNumber,
        facility
    } = req.body;

    const lineNameError = validateRequired(lineNameNumber,"Line Name / Number");
    if (lineNameError) {
        return res.status(400).json({
            message: lineNameError
        });
    }

    const facilityError = validateSelect(facility,"Facility");
    if (facilityError) {
        return res.status(400).json({
            message: facilityError
        });
    }

    next();
};

module.exports = validateLine;