const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const User = sequelize.define("User", {

    userId: {
        type: DataTypes.STRING(20),
        unique:true,
        allowNull:false
    },

    groupName: {
        type: DataTypes.STRING,
    },

    firstName: {
        type: DataTypes.STRING(50),
    },

    lastName: {
        type: DataTypes.STRING(50),
    },

    dob: {
        type: DataTypes.DATEONLY,
    },

    gender: {
        type: DataTypes.ENUM(
            "Male", "Female","Other"
        ),
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING(15),
    },

    email: {
        type: DataTypes.STRING(100),
        unique:true,
        allowNull:false
    },

    password: {
    type: DataTypes.STRING,
    allowNull: false
    },

    address: {
        type: DataTypes.TEXT,
    },

    isActive : {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    image: {
        type: DataTypes.STRING,
    },

    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    createdBy:{
        type:DataTypes.STRING(50)
    },

    updatedBy:{
        type: DataTypes.STRING(50)
    },

    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }

});

module.exports = User;