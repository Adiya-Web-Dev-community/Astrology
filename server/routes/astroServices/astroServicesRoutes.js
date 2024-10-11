const express = require("express");
const router = express.Router();
const GroupPujaRoutes = require("./GroupPujaRoutes");
const GemstoneRoutes = require("./GemstoneRoutes");
const vipPujaRoutes = require("./VipPujaRoutes");

// Use Panchang and Horoscope routes
router.use("/", GroupPujaRoutes);
router.use("/", GemstoneRoutes);
router.use("/", vipPujaRoutes);

module.exports = router;
