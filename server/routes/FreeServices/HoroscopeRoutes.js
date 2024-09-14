const express = require("express");
const router = express.Router();
const {
  createOrUpdateHoroscope,
  getAllHoroscopes,
  getHoroscopeByZodiac,
  deleteHoroscope,
} = require("../../controllers/FreeServices/HoroscopeController");
const { protect } = require("../../middleware/authMiddleware");

// Create or Update Horoscope
router.post("/horoscope", createOrUpdateHoroscope);

// Get all Horoscopes
router.get("/horoscopes", getAllHoroscopes);

// Get a specific Horoscope by Zodiac Sign
router.get("/horoscope/:zodiacSign", getHoroscopeByZodiac);

// Delete Horoscope by Zodiac Sign
router.delete("/horoscope/:zodiacSign", protect, deleteHoroscope);

module.exports = router;
