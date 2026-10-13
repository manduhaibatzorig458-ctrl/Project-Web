require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const connectDB = require("./connectDB");
const User = require("./schemas/user-schema");

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.use("/api/auth", require("./router/auth/auth"));
app.use("/api/pets", require("./router/pet/pet-router"));
app.use("/api/me", require("./router/users-router"));
app.use("/api/admin", require("./router/admin/admin-router"));

const start = async () => {
  await connectDB();
  const { ADMIN_EMAIL: e, ADMIN_PASSWORD: p } = process.env;
  if (e && p && !(await User.findOne({ email: e.toLowerCase() }))) {
    await User.create({ name: "Админ", email: e, passHash: await bcrypt.hash(p, 10), role: "admin" });
    console.log("Admin user created:", e);
  }
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log("API http://localhost:" + port));
};
start().catch((err) => { console.error(err); process.exit(1); });
