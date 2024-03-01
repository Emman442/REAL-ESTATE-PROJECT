const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
      default: "https://images.app.goo.gl/2XFhqmgkLr4LGAtu8",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
