const mongoose = require("mongoose");
const { Schema } = mongoose;

const AstrologerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the astrologer's name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    specialties: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    experience: {
      type: Number,
      required: [true, "Please provide years of experience"],
    },
    bio: {
      type: String,
      required: [true, "Please provide a short biography"],
    },
    profileImage: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    pricing: {
      type: Number,
      required: [true, "Please provide the pricing per consultation"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  { timestamps: true }
);

const Astrologer = mongoose.model("Astrologer", AstrologerSchema);

module.exports = Astrologer;
