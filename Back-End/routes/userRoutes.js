const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const{createUser, getUsers, getUserByUserId,updateUser, deleteUser, restoreUser, login} = require("../controllers/userController");

router.post("/", verifyToken, createUser);

router.get("/",verifyToken,getUsers);

router.get("/:userId", verifyToken, getUserByUserId);

router.put("/:userId", verifyToken, updateUser);

router.delete("/:userId", verifyToken,deleteUser);

router.put("/restore/:userId", restoreUser);

router.post("/login",login);

module.exports = router;