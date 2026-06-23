const sequelize = require("../config/db");
const  User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

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
          image: req.file ? req.file.path : null,
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
          },
          order: [
            ["displayOrder","ASC"]
          ]
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

    let imagePath = user.image;

    if(req.file){
      if(user.image){
        const oldImagePath = path.join(
          __dirname,"..",user.image
        );

        if(fs.existsSync(oldImagePath)){
          fs.unlinkSync(oldImagePath);
        }
      }

      imagePath = req.file.path;
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
        image: imagePath,
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

    const accessToken = jwt.sign(
      {
        userId: user.userId
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m"
      }
    );

    const refreshToken =  jwt.sign(
      {
        userId: user.userId
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d"
      }
    );

    await user.update({refreshToken});

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
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

const refreshAccessToken = async (req, res, next) => {
     
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
      return res.status(401).json({
        message: "Refresh Token missing"
      });
    }

    let decoded;
    let newAccessToken;

    try{
      decoded = jwt.verify(
        refreshToken, process.env.REFRESH_TOKEN_SECRET
      );

      const user = await User.findOne({
        where: {
          userId : decoded.userId,
          refreshToken
        }
      });

      if(!user){
        return res.status(403).json({
          message:"Refresh Token Revoked"
        });
      }

       newAccessToken = jwt.sign(
        {
          userId: decoded.userId
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m"
        }
      );

    } catch {
      return res.status(403).json({
        message: "Invalid Refresh Token"
      });
    }

    res.cookie("accessToken", newAccessToken,{
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000
    });

    return res.status(200).json({
      message: "Access token refreshed"
    });
};

const reorderUsers = async (req, res, next) => {

  const transaction = await sequelize.transaction();

  try{

    const users = req.body;

    await Promise.all(

      users.map((user) => 

        User.update(
          {
            displayOrder: user.displayOrder,
            updatedBy: req.user.userId
          },
          {
            where: {
              userId: user.userId,
              isDeleted: false
            },
            transaction
          }
        )
      )
    );

    await transaction.commit();

    res.status(200).json({
      success: true,
      message: "User order updated successfully"
    });
  } catch (error){
    await transaction.rollback();
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update user order"
    });
  }
};

const logout = async(req, res, next) => {
 try{
  const refreshToken = req.cookies.refreshToken;

  if(refreshToken){
    await User.update(
      {
        refreshToken: null
      },
      {
        where : {
          refreshToken
        }
      }
    );
  }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
       message : "Logout Successful"
  });
  } catch (error){
    next(error);
   }
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
    refreshAccessToken,
    reorderUsers,
    logout
};