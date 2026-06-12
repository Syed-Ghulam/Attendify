const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async(req, res) =>{
    try{
        const defaultPassword = "admin@123";

        const hashedPassword = await bcrypt.hash(
          defaultPassword,
          10
        );
        console.log(req.body);
        const user = await User.create({
          ...req.body,
          password: hashedPassword,
          
        });

        res.status(201).json({
            message:"User created successfully",
            user
        });
    } catch(error) {
  if (error.name === "SequelizeUniqueConstraintError") {

    const messages = error.errors.map(err => {
      switch(err.path) {
        case "userId":
          return "User ID";
        case "email":
          return "Email";
        default:
          return err.path;
      }
    });

    return res.status(400).json({
      message: `${messages.join(" and ")} already exist`
    });
  }

  res.status(500).json({
    message: "Error creating user",
    error: error.message
  });
}
};

const getUsers = async(req,res) =>{
    try{
        const users = await User.findAll({
          where: {
            isDeleted: false
          }
        });
        res.status(200).json(users);
    } catch(error){
        console.log(error)
        res.status(500).json({
            message:"Error Fetching users",
            error
        });
    }
};

const getUserByUserId = async (req, res) => {
  try {

    const user = await User.findOne({
      where: {
        userId: req.params.userId,
        isDeleted: false
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching user",
      error
    });

  }
};

const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      userId: req.params.userId,
      isDeleted: false
    }
  });

      if(!user){
      return res.status(404).json({
        message: "User not found"
      });
    }

  await user.update({...req.body});

  res.json({
    message: "User updated successfully"
  });
};

const deleteUser = async(req, res) => {

  try{

    const user = await User.findOne({
      where: {
        userId : req.params.userId,
        isDeleted: false
      }
    });

    if(!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    await user.update({
      isDeleted: true,
      updatedBy: req.body.updatedBy
    });

    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:"Error deleting user",
      error: error.message
    });
  }
};

const restoreUser = async (req, res) =>{
  try{
    const user = await User.findOne({
      where:{
        userId: req.params.userId,
        isDeleted: true
      }
    });

    if(!user) {
      return res.status(404).json({
        message: "Deleted user not found"
      });
    }

    await user.update({
      isDeleted: false
    });

    res.status(200).json({
      message : "User restored successfully"
    });
  } catch(error) {
    console.log(error);

    res.status(500).json({
      message: "Error restoring user",
      error: error.message
    });
  }
};

const login = async( req, res) => {
    const {userId, password} = req.body;

    const user = await User.findOne({
      where: {
        userId,
        isDeleted:false
      }
    });

    if(!user){
      return res.status(401).json({
        message:"Invalid User Id or Password"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if(!isMatch){
      return res.status(401).json({
        message: "Invalid User ID or Password"
      });
    };

    const token = jwt.sign(
      {
        userId: user.userId
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    return res.status(200).json({
      message:"Login successful",
      token,
      userId: user.userId
    });
};

module.exports = {
    createUser,
    getUsers,
    getUserByUserId,
    updateUser,
    deleteUser,
    restoreUser,
    login
};