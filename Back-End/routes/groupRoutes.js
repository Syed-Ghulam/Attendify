const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const {createGroup, getGroups, getGroupById, updateGroup, updateGroupStatus, deleteGroup, reorderGroups} = require("../controllers/groupController");
const validateGroup = require("../middleware/validateGroup");


router.post("/", verifyToken,validateGroup, createGroup);

router.get("/", verifyToken, getGroups);

router.get('/:id', verifyToken,getGroupById);

router.put("/reorder", verifyToken, reorderGroups);

router.put("/:id", verifyToken, validateGroup, updateGroup);

router.patch("/:id/status", verifyToken, updateGroupStatus);

router.delete("/:id", verifyToken, deleteGroup);

module.exports = router;