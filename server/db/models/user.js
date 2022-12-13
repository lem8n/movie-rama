const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    fullName: {
      required: true,
      type: String,
    },
    moviesPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movies" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
