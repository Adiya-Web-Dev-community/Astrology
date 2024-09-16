const mongoose = require("mongoose");

const groupPujaSchema = new mongoose.Schema({
  pujaName: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: String, required: true }, // e.g., '2 hours'
  location: { type: String, required: true },
  price: { type: Number, required: true },
  maxParticipants: { type: Number, required: true },
  bookedParticipants: { type: Number, default: 0 },
  images: [{ type: String }], // URLs for images
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GroupPuja", groupPujaSchema);
