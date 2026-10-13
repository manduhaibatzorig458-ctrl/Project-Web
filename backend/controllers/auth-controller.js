const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user-schema");

const sign = (u) => jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) throw new Error("Мэдээлэл дутуу (нууц үг 6+ тэмдэгт)");
  const u = await User.create({ name, email, passHash: await bcrypt.hash(password, 10) });
  res.json({ token: sign(u), user: { name: u.name, role: u.role } });
};

exports.login = async (req, res) => {
  const u = await User.findOne({ email: (req.body.email || "").toLowerCase() });
  if (!u || !(await bcrypt.compare(req.body.password || "", u.passHash))) throw new Error("Имэйл эсвэл нууц үг буруу");
  res.json({ token: sign(u), user: { name: u.name, role: u.role } });
};
