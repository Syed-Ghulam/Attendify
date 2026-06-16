const {
    validateRequired,
    validateSelect
} = require("../utils/validation");

const validateGroup = (req, res, next) => {

    const {
        groupName,
        roleName
    } = req.body;

    const groupNameError = validateRequired(groupName,"Group Name");
    if (groupNameError) {
        return res.status(400).json({
            message: groupNameError
        });
    }

    const roleNameError = validateSelect(roleName,"Role Name");
    if (roleNameError) {
        return res.status(400).json({
            message: roleNameError
        });
    }

    next();
};

module.exports = validateGroup;