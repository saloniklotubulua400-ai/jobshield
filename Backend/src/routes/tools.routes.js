const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const { tailorCv, interviewQuestions, interviewFeedback } = require("../controllers/tools.controller");

router.post("/cv/tailor", requireAuth, tailorCv);
router.post("/interview/questions", requireAuth, interviewQuestions);
router.post("/interview/feedback", requireAuth, interviewFeedback);

module.exports = router;