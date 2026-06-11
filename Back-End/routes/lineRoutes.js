const express = require("express");

const router = express.Router();

const {createLine, getLines, getLineById, updateLine , deleteLine} = require("../controllers/lineController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, createLine);

router.get("/", verifyToken, getLines);

router.get("/:id", verifyToken, getLineById);

router.put("/:id", verifyToken, updateLine);

router.delete("/:id", verifyToken, deleteLine);

module.exports = router;