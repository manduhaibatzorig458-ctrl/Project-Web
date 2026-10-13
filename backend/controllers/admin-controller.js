const Pet = require("../schemas/pet-schema");
const Request = require("../schemas/request-schema");
const User = require("../schemas/user-schema");

exports.stats = async (req, res) => res.json({
  pets: await Pet.countDocuments(),
  waiting: await Pet.countDocuments({ approved: false }),
  adopted: await Pet.countDocuments({ status: "adopted" }),
  requests: await Request.countDocuments({ status: "new" }),
  users: await User.countDocuments(),
});

exports.pets = async (req, res) => res.json(await Pet.find().select("-img").populate("owner", "name email").sort("-createdAt"));

exports.updatePet = async (req, res) => {
  const { approved, status } = req.body;
  const set = {};
  if (typeof approved === "boolean") set.approved = approved;
  if (["available", "pending", "adopted"].includes(status)) set.status = status;
  res.json(await Pet.findByIdAndUpdate(req.params.id, set, { new: true }));
};

exports.deletePet = async (req, res) => {
  await Pet.findByIdAndDelete(req.params.id);
  await Request.deleteMany({ pet: req.params.id });
  res.json({ ok: true });
};

exports.requests = async (req, res) => res.json(await Request.find().populate("pet", "name").sort("-createdAt"));

exports.updateRequest = async (req, res) => {
  const r = await Request.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (r.status === "accepted") await Pet.findByIdAndUpdate(r.pet, { status: "adopted" });
  res.json(r);
};
