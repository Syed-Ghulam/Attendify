const express = require("express");
const router = express.Router();

const{createUser, getUsers, getUserByUserId,updateUser} = require("../controllers/userController");

router.post("/",createUser);

router.get("/",getUsers);

router.get("/:userId", getUserByUserId);

router.put("/:userId", updateUser);

module.exports = router;