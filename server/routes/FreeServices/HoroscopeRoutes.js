const express = require("express");
const router = express.Router();
const {
  createOrUpdateHoroscope,
  getAllHoroscopes,
  getHoroscopeByZodiac,
  deleteHoroscope,
} = require("../../controllers/FreeServices/HoroscopeController");
const { protect } = require("../../middleware/authMiddleware"); // Optional middleware for admin protection

// Create or Update Horoscope
router.post("/horoscope", protect, createOrUpdateHoroscope);

// Get all Horoscopes
router.get("/horoscopes", protect, getAllHoroscopes);

// Get a specific Horoscope by Zodiac Sign
router.get("/horoscope/:zodiacSign", protect, getHoroscopeByZodiac);

// Delete Horoscope by Zodiac Sign
router.delete("/horoscope/:zodiacSign", protect, deleteHoroscope);

module.exports = router;
