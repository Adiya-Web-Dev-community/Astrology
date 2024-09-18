const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    issueType: {
      type: String,
      required: true,
      enum: [
        "Technical Issue",
        "Account Related Issue",
        "Refund Request",
        "Feedback",
        "Other",
      ],
      default: "General Inquiry",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Support", supportSchema);
