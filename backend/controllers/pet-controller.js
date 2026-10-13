const Pet = require("../schemas/pet-schema");
const Request = require("../schemas/request-schema");

exports.list = async (req, res) => {
  const { q, type, dist, status, age } = req.query;
  const f = { approved: true };
  if (type) f.type = type;
  if (dist) f.dist = dist;
  if (status) f.status = status;
  if (q) f.$or = [{ name: new RegExp(q, "i") }, { desc: new RegExp(q, "i") }];
  if (age === "k") f.age = { $lt: 1 };
  if (age === "m") f.age = { $gte: 1, $lte: 5 };
  if (age === "o") f.age = { $gt: 5 };
  res.json(await Pet.find(f).select("-phone").sort("-createdAt"));
};

exports.create = async (req, res) => {
  const { name, type, age, sex, dist, phone, desc, img } = req.body;
  if (!name || !phone) throw new Error("Нэр, утас заавал");
  res.json(await Pet.create({ name, type, age, sex, dist, phone, desc, img, owner: req.user.id }));
};

exports.createRequest = async (req, res) => {
  const pet = await Pet.findOne({ _id: req.params.id, approved: true });
  if (!pet || pet.status === "adopted") throw new Error("Энэ амьтан боломжгүй");
  const r = await Request.create({ pet: pet._id, user: req.user.id, name: req.body.name, phone: req.body.phone, msg: req.body.msg });
  if (pet.status === "available") { pet.status = "pending"; await pet.save(); }
  res.json(r);
};

exports.minePets = async (req, res) => res.json(await Pet.find({ owner: req.user.id }).select("-img").sort("-createdAt"));
exports.mineRequests = async (req, res) =>
  res.json(await Request.find({ user: req.user.id }).populate("pet", "name").sort("-createdAt"));
