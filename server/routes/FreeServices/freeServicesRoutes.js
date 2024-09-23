const express = require("express");
const router = express.Router();
const panchangRoutes = require("./panchangRoutes");
const horoscopeRoutes = require("./HoroscopeRoutes");
const prokeralaRoutes = require("./prokeralaRoutes");

// Use Panchang and Horoscope routes
router.use("/", panchangRoutes);
router.use("/", horoscopeRoutes);
router.use("/", prokeralaRoutes);

module.exports = router;
