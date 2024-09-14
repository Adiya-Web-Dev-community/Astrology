const mongoose = require("mongoose");

const horoscopeSchema = new mongoose.Schema(
  {
    zodiacSign: {
      type: String,
      required: true,
      enum: [
        "aries",
        "taurus",
        "gemini",
        "cancer",
        "leo",
        "virgo",
        "libra",
        "scorpio",
        "sagittarius",
        "capricorn",
        "aquarius",
        "pisces",
      ],
    },
    zodiacImage: String,
    daily: {
      date: { type: String },
      description: { type: String },
      luckyColor: { type: String },
      luckyNumber: { type: String },
    },
    monthly: {
      month: { type: String },
      description: { type: String },
      career: { type: String },
      love: { type: String },
      health: { type: String },
      money: { type: String },
    },
    yearly: {
      year: { type: String },
      description: { type: String },
      career: { type: String },
      love: { type: String },
      health: { type: String },
      money: { type: String },
    },
    dateRange: {
      start: { type: Date },
      end: { type: Date },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Horoscope", horoscopeSchema);
