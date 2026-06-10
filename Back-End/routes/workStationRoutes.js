const express = require("express");

const router = express.Router();

const { createWorkStation, getWorkStation, getWorkStationById, updateWorkStation, deleteWorkStation } = require("../controllers/workStationController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/",verifyToken, createWorkStation);

router.get("/",verifyToken, getWorkStation);

router.get("/:id",verifyToken, getWorkStationById);

router.put("/:id",verifyToken, updateWorkStation);

router.delete("/:id",verifyToken, deleteWorkStation);

module.exports = router;