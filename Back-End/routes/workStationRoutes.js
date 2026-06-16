const express = require("express");

const router = express.Router();

const { createWorkStation, getWorkStation, getWorkStationById, updateWorkStation, deleteWorkStation } = require("../controllers/workStationController");
const verifyToken = require("../middleware/authMiddleware");
const validateWorkStation = require("../middleware/validateWorkstation");

router.post("/",verifyToken,validateWorkStation, createWorkStation);

router.get("/",verifyToken, getWorkStation);

router.get("/:id",verifyToken, getWorkStationById);

router.put("/:id",verifyToken,validateWorkStation, updateWorkStation);

router.delete("/:id",verifyToken, deleteWorkStation);

module.exports = router;