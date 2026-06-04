const User = require("../models/User");

const createUser = async(req, res) =>{
    try{
        const user = await User.create({...req.body , createdBy:"Admin", updatedBy:"Admin"});

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

  await user.update({...req.body, updatedBy: "Admin"});

  res.json({
    message: "User updated successfully"
  });
};

const deleteUser = async(req, res) => {

  console.log(req.params);
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
      isDeleted: true
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

module.exports = {
    createUser,
    getUsers,
    getUserByUserId,
    updateUser,
    deleteUser,
    restoreUser
};