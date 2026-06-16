const express = require("express");

const router = express.Router();

const {createFacility, getFacility, getFacilityById , updateFacility, deleteFacility} = require("../controllers/facilityController");

const verifyToken = require("../middleware/authMiddleware");
const validateFacility = require("../middleware/validateFacility");

router.post("/", verifyToken, validateFacility, createFacility);

router.get("/", verifyToken, getFacility);

router.get("/:id", verifyToken, getFacilityById);

router.put("/:id", verifyToken, validateFacility, updateFacility);

router.delete("/:id", verifyToken, deleteFacility);

module.exports = router;