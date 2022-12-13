const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    postedBy: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      type: Object,
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    hatedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movies", movieSchema);
