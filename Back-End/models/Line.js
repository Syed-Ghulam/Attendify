const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Line = sequelize.define("Line", {
    lineNameNumber: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    lineCode: {
        type: DataTypes.STRING(50)
    },

    facility: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    createdBy: {
        type: DataTypes.STRING(100),
    },

    updatedBy: {
        type: DataTypes.STRING(100),
    },

    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Line;