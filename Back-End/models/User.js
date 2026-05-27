const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const User = sequelize.define("User", {

    userId: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
    },

    groupName: {
        type: DataTypes.STRING,
    },

    firstName: {
        type: DataTypes.STRING,
    },

    lastName: {
        type: DataTypes.STRING,
    },

    dob: {
        type: DataTypes.DATE,
    },

    gender: {
        type: DataTypes.STRING,
    },

    phone: {
        type: DataTypes.STRING,
    },

    email: {
        type: DataTypes.STRING,
        unique:true,
        allowNull:false
    },

    address: {
        type: DataTypes.STRING,
    },

    status: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    }

});

module.exports = User;