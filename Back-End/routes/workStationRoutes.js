const express = require("express");

const router = express.Router();

const { createWorkStation, getWorkStation } = require("../controllers/workStationController");

router.post("/", createWorkStation);

router.get("/", getWorkStation);

module.exports = router;