const {DataTypes} = require("sequelize");

const sequelize = require('../config/db');

const WorkStation = sequelize.define("WorkStation", {

    workstationName:{
        type: DataTypes.STRING,
        allowNull: false
    },

    ipAddress:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    facility:{
        type: DataTypes.STRING,
        allowNull: false
    },

    code:{
        type: DataTypes.STRING
    },

    linenameNumber:{
        type: DataTypes.STRING,
        allowNull: false
    },

    isActive:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    isDeleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    createdBy:{
        type: DataTypes.STRING(50)
    },

    updatedBy:{
        type: DataTypes.STRING(50)
    }

});

module.exports = WorkStation;