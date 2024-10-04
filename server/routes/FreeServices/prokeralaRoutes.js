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
router.post("/vrat-upvaas", prokeralaController.getVratUpvaas);

// Horoscope for a specific zodiac sign
router.post("/horoscope", prokeralaController.getDailyHoroscope);

module.exports = router;
