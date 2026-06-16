const {
    validateRequired
} = require("../utils/validation");

const validateFacility = (req, res, next) => {

    const {
        facilityName,
        location
    } = req.body;

    const facilityNameError = validateRequired(facilityName,"Facility Name");
    if (facilityNameError) {
        return res.status(400).json({
            message: facilityNameError
        });
    }

    const locationError = validateRequired(location,"Location");
    if (locationError) {
        return res.status(400).json({
            message: locationError
        });
    }

    next();
};

module.exports = validateFacility;