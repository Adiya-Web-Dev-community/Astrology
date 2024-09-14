const express = require("express");
const router = express.Router();
const panchangRoutes = require("./panchangRoutes");
const horoscopeRoutes = require("./HoroscopeRoutes");

// Use Panchang and Horoscope routes
router.use("/", panchangRoutes);
router.use("/", horoscopeRoutes);

module.exports = router;
