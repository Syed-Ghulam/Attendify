const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const{createUser, getUsers, getUserByUserId,updateUser, deleteUser, restoreUser, login, updateUserStatus, checkAuth,logout} = require("../controllers/userController");
const validateUser = require("../middleware/validateUser");
const validateLogin = require("../middleware/validateLogin");

router.get("/check-auth", verifyToken, checkAuth);

router.post("/", verifyToken, validateUser, createUser);

router.get("/",verifyToken,getUsers);

router.get("/:userId", verifyToken, getUserByUserId);

router.put("/:userId", verifyToken,validateUser, updateUser);

router.put("/restore/:userId", verifyToken, restoreUser);

router.patch("/:userId/status", verifyToken, updateUserStatus)

router.delete("/:userId", verifyToken, deleteUser);

router.post("/login",validateLogin, login);

router.post("/logout", logout);

module.exports = router;