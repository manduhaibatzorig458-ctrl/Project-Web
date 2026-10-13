const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const h = req.headers.authorization || "";
  try {
    req.user = jwt.verify(h.replace("Bearer ", ""), process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Нэвтэрнэ үү" });
  }
};
const adminOnly = (req, res, next) =>
  req.user.role === "admin" ? next() : res.status(403).json({ error: "Зөвхөн админ" });

module.exports = { auth, adminOnly };
