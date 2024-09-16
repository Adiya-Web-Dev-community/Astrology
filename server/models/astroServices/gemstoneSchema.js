const mongoose = require("mongoose");

const gemstoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  carat: { type: Number, required: true }, // e.g., 1.5 carats
  zodiacSign: { type: String, required: true }, // e.g., "Virgo"
  images: [{ type: String }], // URLs for gemstone images
  availability: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Gemstone", gemstoneSchema);
