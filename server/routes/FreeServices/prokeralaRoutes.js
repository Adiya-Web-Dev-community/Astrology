// routes/prokeralaRoutes.js
const express = require("express");
const router = express.Router();
const prokeralaController = require("../../controllers/FreeServices/prokeralaController");

// Today's Panchang
router.post("/panchang", prokeralaController.getTodaysPanchang);

// Janam Kundali (Birth Chart)
router.post("/janam-kundali", prokeralaController.getJanamKundali);

// Kundali Match
router.post("/kundali-match", prokeralaController.getKundaliMatch);

// Shubh Muhurat
router.post("/shubh-muhurat", prokeralaController.getShubhMuhurat);

// Vrat and Upvaas
router.get("/vrat-upvaas", prokeralaController.getVratUpvaas);

// Horoscope for a specific zodiac sign
router.get("/horoscope/:zodiacSign", prokeralaController.getHoroscope);

module.exports = router;
