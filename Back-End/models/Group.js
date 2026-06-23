const {DataTypes} = require("sequelize");

const sequelize = require("../config/db");

const Group = sequelize.define("Group", {
    groupName:{
        type: DataTypes.STRING(50),
        allowNull:false
    },

    roleName:{
        type: DataTypes.STRING(50),
        allowNull: false
    },

    description:{
        type: DataTypes.TEXT
    },

    isActive : {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    createdBy : {
        type: DataTypes.STRING(50)
    },

    updatedBy : {
        type : DataTypes.STRING(50)
    },

    isDeleted : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }

})

module.exports = Group;