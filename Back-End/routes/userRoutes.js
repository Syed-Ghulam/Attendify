const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const{createUser, getUsers, getUserByUserId,updateUser, deleteUser, restoreUser, login} = require("../controllers/userController");
const validateUser = require("../middleware/validateUser");
const validateLogin = require("../middleware/validateLogin");

router.post("/", verifyToken, validateUser, createUser);

router.get("/",verifyToken,getUsers);

router.get("/:userId", verifyToken, getUserByUserId);

router.put("/:userId", verifyToken,validateUser, updateUser);

router.delete("/:userId", verifyToken,deleteUser);

router.put("/restore/:userId", verifyToken, restoreUser);

router.post("/login",validateLogin, login);

module.exports = router;