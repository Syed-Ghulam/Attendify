const express = require("express");

const router = express.Router();

const {createLine, getLines, getLineById, updateLine , deleteLine} = require("../controllers/lineController");
const verifyToken = require("../middleware/authMiddleware");
const validateLine = require("../middleware/validateLine");

router.post("/", verifyToken,validateLine, createLine);

router.get("/", verifyToken, getLines);

router.get("/:id", verifyToken, getLineById);

router.put("/:id", verifyToken,validateLine, updateLine);

router.delete("/:id", verifyToken, deleteLine);

module.exports = router;