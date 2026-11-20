const { jobTerms } = require("./cvTailor");

const TIP = "Use the STAR format: Situation, Task, Action, Result. Finish with a measurable result if you can.";

function basicQuestions(job) {
  const q = [
    "Tell me about yourself and why you applied for this role.",
    "Describe a time you worked under a tight deadline. What did you do?",
    "Tell me about a mistake you made and what you learned from it.",
    "Describe a disagreement with a colleague or client and how you handled it.",
    ...jobTerms(job).slice(0, 4).map((t) => `Tell me about a time you used ${t.term}. What was the result?`),
    "What questions do you have for us?",
  ];
  return q.map((question) => ({ question, tip: TIP }));
}

function answerFeedback(answer) {
  const words = answer.trim().split(/\s+/).length;
  const strengths = [], improvements = [];
  if (words < 40) improvements.push("Your answer is short. Aim for about 60 to 150 words with a clear example.");
  else strengths.push("You gave enough detail to be understood.");
  if (words > 250) improvements.push("Your answer is long. Cut it to the most important points.");
  if (/\b(I|my|me)\b/.test(answer)) strengths.push("You talked about your own role."); else improvements.push("Say what YOU did, using \"I\", not only what the team did.");
  if (/\d/.test(answer)) strengths.push("You included numbers."); else improvements.push("Add a number or measurable result (time saved, users reached, money, percentage).");
  if (/\b(result|resulted|increased|reduced|saved|improved|achieved|delivered|learned|learnt)\b/i.test(answer)) strengths.push("You described an outcome."); else improvements.push("End with the result, and what you learned.");
  return { strengths, improvements };
}
module.exports = { basicQuestions, answerFeedback };