const express = require("express");
const router = express.Router();

const{createUser, getUsers, getUserByUserId,updateUser, deleteUser, restoreUser, login} = require("../controllers/userController");

router.post("/",createUser);

router.get("/",getUsers);

router.get("/:userId", getUserByUserId);

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUser);

router.put("/restore/:userId", restoreUser);

router.post("/login",login);

module.exports = router;