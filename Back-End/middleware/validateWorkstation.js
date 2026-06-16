const {
    validateRequired,
    validateSelect
} = require("../utils/validation");

const validateWorkStation = (req, res, next) => {

    const {
        workstationName,
        ipAddress,
        facility,
        linenameNumber
    } = req.body;

    const workstationNameError = validateRequired(workstationName,"Workstation Name");
    if (workstationNameError) {
        return res.status(400).json({
            message: workstationNameError
        });
    }

    const ipAddressError = validateRequired(ipAddress,"IP Address");
    if (ipAddressError) {
        return res.status(400).json({
            message: ipAddressError
        });
    }

    const facilityError = validateSelect(facility,"Facility");
    if (facilityError) {
        return res.status(400).json({
            message: facilityError
        });
    }

    const lineError = validateSelect(linenameNumber,"Line Name / Number");
    if (lineError) {
        return res.status(400).json({
            message: lineError
        });
    }

    next();
};

module.exports = validateWorkStation;