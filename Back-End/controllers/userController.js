const User = require("../models/User");

const createUser = async(req, res) =>{
    try{
        const user = await User.create(req.body);

        res.status(201).json({
            message:"User created successfully",
            user
        });
    } catch(error){
        console.log(error)
        res.status(500).json({
            message:"Error creating user",
            error
        });
    }
};

const getUsers = async(req,res) =>{
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    } catch(error){
        console.log(error)
        res.status(500).json({
            message:"Error Fetching users",
            error
        });
    }
};
module.exports = {
    createUser,
    getUsers
};