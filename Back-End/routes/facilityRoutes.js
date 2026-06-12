const express = require("express");

const router = express.Router();

const {createFacility, getFacility, getFacilityById , updateFacility, deleteFacility} = require("../controllers/facilityController");

const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, createFacility);

router.get("/", verifyToken, getFacility);

router.get("/:id", verifyToken, getFacilityById);

router.put("/:id", verifyToken, updateFacility);

router.delete("/:id", verifyToken, deleteFacility);

module.exports = router;