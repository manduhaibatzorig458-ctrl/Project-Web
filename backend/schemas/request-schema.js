const mongoose = require("mongoose");

module.exports = mongoose.model("Request", new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String, phone: String, msg: String,
  status: { type: String, enum: ["new", "accepted", "rejected"], default: "new" },
}, { timestamps: true }));
