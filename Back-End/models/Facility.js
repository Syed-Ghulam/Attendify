const {DataTypes} = require("sequelize");

const sequelize = require("../config/db");

const Facility = sequelize.define("Facility",{
    facilityName: {
        type: DataTypes.STRING(100),
        allowNull:false
    },

    location:{
        type:DataTypes.STRING(100),
        allowNull:false
    },

    code: {
        type:DataTypes.STRING(50)
    },

    
    description:{
        type: DataTypes.TEXT
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
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

module.exports = Facility;