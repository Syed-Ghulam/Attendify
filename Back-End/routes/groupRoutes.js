const express = require("express");
const router = express.Router();

const {createGroup, getGroups, deleteGroup} = require("../controllers/groupController");


router.post("/",createGroup);

router.get("/", getGroups);

router.delete("/:id", deleteGroup);

module.exports = router;