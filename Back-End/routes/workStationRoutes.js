const express = require("express");

const router = express.Router();

const { createWorkStation, getWorkStation, getWorkStationById, updateWorkStation } = require("../controllers/workStationController");

router.post("/", createWorkStation);

router.get("/", getWorkStation);

router.get("/:id", getWorkStationById);

router.put("/:id", updateWorkStation);

module.exports = router;