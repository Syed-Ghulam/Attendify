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

    status:{
        type: DataTypes.STRING,
        defaultValue: "Active"
    }

});

module.exports = WorkStation;