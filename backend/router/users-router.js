const router = require("express").Router();
const { auth } = require("../middleware/auth");
const wrap = require("../middleware/wrap");
const c = require("../controllers/pet-controller");

router.get("/pets", auth, wrap(c.minePets));
router.get("/requests", auth, wrap(c.mineRequests));

module.exports = router;
