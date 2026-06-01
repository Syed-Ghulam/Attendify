const {DataTypes} = require("sequelize");

const sequelize = require("../config/db");

const Group = sequelize.define("Group", {
    groupName:{
        type: DataTypes.STRING,
        allowNull:false
    },

    roleName:{
        type: DataTypes.STRING,
        allowNull: false
    },

    description:{
        type: DataTypes.STRING
    },

    status:{
        type: DataTypes.STRING
    }
})

module.exports = Group;