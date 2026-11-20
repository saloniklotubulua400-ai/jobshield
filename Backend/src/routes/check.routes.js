const router = require("express").Router();
const { checkJob, reviewOffer } = require("../controllers/check.controller");

router.post("/check", checkJob);
router.post("/offer-review", reviewOffer);

module.exports = router;