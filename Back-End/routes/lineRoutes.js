const express = require("express");

const router = express.Router();

const {createLine, getLines, getLineById, updateLine, updateLineStatus, reorderLines, deleteLine} = require("../controllers/lineController");
const verifyToken = require("../middleware/authMiddleware");
const validateLine = require("../middleware/validateLine");

router.post("/", verifyToken,validateLine, createLine);

router.get("/", verifyToken, getLines);

router.get("/:id", verifyToken, getLineById);

router.put("/reorder", verifyToken, reorderLines);

router.put("/:id", verifyToken, validateLine, updateLine);

router.patch("/:id/status", verifyToken, updateLineStatus);

router.delete("/:id", verifyToken, deleteLine);

module.exports = router;