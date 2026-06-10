const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const {createGroup, getGroups, getGroupById, updateGroup, deleteGroup} = require("../controllers/groupController");


router.post("/", verifyToken,createGroup);

router.get("/", verifyToken, getGroups);

router.get('/:id', verifyToken,getGroupById);

router.put("/:id", verifyToken, updateGroup);

router.delete("/:id", verifyToken, deleteGroup);

module.exports = router;