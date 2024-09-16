const express = require("express");
const router = express.Router();
const GroupPujaRoutes = require("./GroupPujaRoutes");
const GemstoneRoutes = require("./GemstoneRoutes");

// Use Panchang and Horoscope routes
router.use("/", GroupPujaRoutes);
router.use("/", GemstoneRoutes);

module.exports = router;
