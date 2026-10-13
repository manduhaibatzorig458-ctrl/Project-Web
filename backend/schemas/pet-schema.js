const mongoose = require("mongoose");

module.exports = mongoose.model("Pet", new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Нохой", "Муур", "Бусад"], default: "Нохой" },
  age: Number, sex: String, dist: String, phone: String, desc: String,
  img: String, // base64 dataURL (MVP)
  status: { type: String, enum: ["available", "pending", "adopted"], default: "available" },
  approved: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true }));
