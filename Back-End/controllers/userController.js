const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async(req, res, next) =>{
    try{
        const defaultPassword = "admin@123";

        const hashedPassword = await bcrypt.hash(
          defaultPassword,
          10
        );
        
        const user = await User.create({
          userId: req.body.userId,
          groupName: req.body.groupName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dob: req.body.dob,
          gender: req.body.gender,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.address,
          isActive: req.body.isActive,
          image: req.body.image,
          password: hashedPassword,
          createdBy: req.user.userId,
          updatedBy: req.user.userId
          
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

  next(error);
 }
};


const getUsers = async(req,res, next) =>{
    try{
        const users = await User.findAll({
          where: {
            isDeleted: false
          }
        });
        res.status(200).json(users);
    } catch(error){
        next(error)
    }
};

const getUserByUserId = async (req, res, next) => {
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

    next(error);
  }
};

const updateUser = async (req, res,next) => {
  try{
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

  await user.update({
        groupName: req.body.groupName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        isActive: req.body.isActive,
        image: req.body.image,
        updatedBy: req.user.userId

    });

  res.json({
    message: "User updated successfully"
  });
} catch (error){
  next(error);
}
};

const updateUserStatus = async (req, res, next) => {
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

        await user.update({
            isActive: req.body.isActive,
            updatedBy: req.user.userId
        });

        res.status(200).json({
            message: "User status updated successfully"
        });

    } catch (error) {
        next(error);
    }
};

const deleteUser = async(req, res, next) => {

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
      updatedBy: req.user.userId
    });

    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    next(error)
  }
};

const restoreUser = async (req, res, next) =>{
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
      isDeleted: false,
      updatedBy: req.user.userId
    });

    res.status(200).json({
      message : "User restored successfully"
    });
  } catch(error) {
     next(error);
  }
};

const login = async( req, res, next) => {
  try{
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

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message:"Login successful",
      userId: user.userId
    });
  }catch(error){
    next(error);
  }
};

const checkAuth = (req, res) => {
    res.status(200).json({
        authenticated: true,
        userId: req.user.userId
    });
};

const logout = (req, res) => {

  res.clearCookie("token");

  res.status(200).json({
    message:"Logout successful"
  });
};

module.exports = {
    createUser,
    getUsers,
    getUserByUserId,
    updateUser,
    updateUserStatus,
    deleteUser,
    restoreUser,
    login,
    checkAuth,
    logout
};