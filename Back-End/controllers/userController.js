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

const getUserByUserId = async (req, res) => {
  try {

    const user = await User.findOne({
      where: {
        userId: req.params.userId
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
      userId: req.params.userId
    }
  });

  await user.update(req.body);

  res.json({
    message: "User updated successfully"
  });
};

module.exports = {
    createUser,
    getUsers,
    getUserByUserId,
    updateUser
};