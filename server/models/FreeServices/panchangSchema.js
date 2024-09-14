const mongoose = require("mongoose");

const additionalInfoSchema = new mongoose.Schema({
  sunRise: { type: String, required: true },
  sunSet: { type: String, required: true },
  moonRise: { type: String, required: true },
  moonSet: { type: String, required: true },
  shakaSamvat: { type: String, required: true },
  amantaMonth: { type: String, required: true },
  purnimantaMonth: { type: String, required: true },
  sunSign: { type: String, required: true },
  moonSign: { type: String, required: true },
  paksha: { type: String, required: true },
});

const panchangSchema = new mongoose.Schema({
  tithi: { type: String, required: true },
  nakshatra: { type: String, required: true },
  yoga: { type: String, required: true },
  karana: { type: String, required: true },
  day: { type: String, required: true },

  // Inauspicious Times
  inauspiciousTimes: {
    gulikaiKalam: { type: String, required: true },
    yamaganda: { type: String, required: true },
    durMuhurtam: { type: String, required: true },
    varjyamKalam: { type: String, required: true },
    rahuKalam: { type: String, required: true },
  },

  // Auspicious Times
  auspiciousTimes: {
    amritKalam: { type: String, required: true },
    abhijitMuhurat: { type: String, required: true },
  },

  // Additional Info
  additionalInfo: additionalInfoSchema,

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Panchang", panchangSchema);
