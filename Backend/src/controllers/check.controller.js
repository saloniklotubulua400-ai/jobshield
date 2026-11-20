const { analyze } = require("../services/scamRules");
const { reviewOffer } = require("../services/offerRules");
const { secondOpinion, aiEnabled } = require("../services/aiReview");

function readText(req, res) {
  const { text } = req.body || {};
  if (typeof text !== "string" || text.trim().length < 20) {
    res.status(400).json({ success: false, message: "Paste at least a few sentences of the text." });
    return null;
  }
  if (text.length > 8000) {
    res.status(413).json({ success: false, message: "That is too long. Paste up to 8,000 characters." });
    return null;
  }
  return text;
}

// Adds the optional AI second opinion when the user asks for it ({"useAi": true})
async function aiPart(kind, text, wanted) {
  if (!wanted) return {};
  if (!aiEnabled()) return { aiError: "The AI second opinion is not set up on this server." };
  const ai = await secondOpinion(kind, text);
  return ai ? { ai } : { aiError: "The AI second opinion could not be completed. The automatic check is still valid." };
}

exports.checkJob = async (req, res, next) => {
  try {
    const text = readText(req, res);
    if (text === null) return;
    const result = analyze(text, { companyDomain: req.body.companyDomain });
    res.status(200).json({ success: true, result, ...(await aiPart("job message or job post", text, req.body.useAi === true)) });
  } catch (err) { next(err); }
};

exports.reviewOffer = async (req, res, next) => {
  try {
    const text = readText(req, res);
    if (text === null) return;
    const result = reviewOffer(text);
    res.status(200).json({ success: true, result, ...(await aiPart("job offer or contract", text, req.body.useAi === true)) });
  } catch (err) { next(err); }
};