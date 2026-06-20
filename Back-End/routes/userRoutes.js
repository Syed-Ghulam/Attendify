const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const{createUser, getUsers, getUserByUserId,updateUser, deleteUser, restoreUser, login, updateUserStatus, checkAuth,logout, refreshAccessToken} = require("../controllers/userController");
const validateUser = require("../middleware/validateUser");
const validateLogin = require("../middleware/validateLogin");
const upload = require("../middleware/upload");

router.get("/check-auth", verifyToken, checkAuth);

router.post("/", verifyToken, upload.single("image"), validateUser, createUser);

router.get("/",verifyToken,getUsers);

router.get("/:userId", verifyToken, getUserByUserId);

router.put("/:userId", verifyToken, upload.single("image"), validateUser, updateUser);

router.put("/restore/:userId", verifyToken, restoreUser);

router.patch("/:userId/status", verifyToken, updateUserStatus)

router.delete("/:userId", verifyToken, deleteUser);

router.post("/login",validateLogin, login);

router.post("/refresh-token", refreshAccessToken);

router.post("/logout", logout);

module.exports = router;