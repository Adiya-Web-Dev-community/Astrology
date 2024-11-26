const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    sessionType: {
      type: String,
      enum: ["chat", "audioCall", "videoCall", "liveVideo"],
      required: true,
    },
    astrologerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrologer",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    duration: {
      type: Number, // Duration in minutes
    },
    chargePerMinute: {
      type: Number,
      required: true, // Astrologer's rate per minute
    },
    totalCharge: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["completed", "ongoing", "canceled", "missed"],
      default: "ongoing",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    feedback: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);