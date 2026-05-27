const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
    "user_management",
    "root",
    "Syed@5438",
    {
        host:"localhost",
        dialect:"mysql",
    }
);

module.exports=sequelize;