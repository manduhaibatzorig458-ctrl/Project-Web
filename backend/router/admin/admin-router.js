const router = require("express").Router();
const { auth, adminOnly } = require("../../middleware/auth");
const wrap = require("../../middleware/wrap");
const c = require("../../controllers/admin-controller");

router.use(auth, adminOnly);
router.get("/stats", wrap(c.stats));
router.get("/pets", wrap(c.pets));
router.patch("/pets/:id", wrap(c.updatePet));
router.delete("/pets/:id", wrap(c.deletePet));
router.get("/requests", wrap(c.requests));
router.patch("/requests/:id", wrap(c.updateRequest));

module.exports = router;
