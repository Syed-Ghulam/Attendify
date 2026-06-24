const express = require("express");

const router = express.Router();

const { createWorkStation, getWorkStation, getWorkStationById, updateWorkStation, updateWorkStationStatus, reorderWorkStations, deleteWorkStation } = require("../controllers/workStationController");
const verifyToken = require("../middleware/authMiddleware");
const validateWorkStation = require("../middleware/validateWorkstation");

router.post("/",verifyToken,validateWorkStation, createWorkStation);

router.get("/",verifyToken, getWorkStation);

router.put("/reorder", verifyToken, reorderWorkStations);

router.get("/:id",verifyToken, getWorkStationById);

router.put("/:id",verifyToken,validateWorkStation, updateWorkStation);

router.patch("/:id/status", verifyToken, updateWorkStationStatus);

router.delete("/:id",verifyToken, deleteWorkStation);

module.exports = router;