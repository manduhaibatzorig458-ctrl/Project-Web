const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true },
  passHash: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true }));
