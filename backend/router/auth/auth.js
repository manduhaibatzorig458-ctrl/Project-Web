const router = require("express").Router();
const wrap = require("../../middleware/wrap");
const c = require("../../controllers/auth-controller");

router.post("/register", wrap(c.register));
router.post("/login", wrap(c.login));

module.exports = router;
