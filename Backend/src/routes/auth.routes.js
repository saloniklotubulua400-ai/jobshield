const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const { signup, login, me } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", requireAuth, me);

module.exports = router;