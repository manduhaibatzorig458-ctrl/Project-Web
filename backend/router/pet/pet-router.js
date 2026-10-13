const router = require("express").Router();
const { auth } = require("../../middleware/auth");
const wrap = require("../../middleware/wrap");
const c = require("../../controllers/pet-controller");

router.get("/", wrap(c.list));
router.post("/", auth, wrap(c.create));
router.post("/:id/requests", auth, wrap(c.createRequest));

module.exports = router;
