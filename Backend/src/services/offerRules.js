// Rule-based review of job offers and contracts. Not legal advice.
const RULES = [
  { id: "keeps_documents", weight: 50, title: "Employer keeps your passport or certificates",
    why: "Employers should not hold your original passport or certificates. This is a serious warning sign, and in many places it is illegal.",
    test: /\b(retain|keep|hold|surrender|submit)\b.{0,40}\b(original )?(passport|certificates?|academic documents?)\b/i },
  { id: "unpaid_trial", weight: 35, title: "Unpaid trial or probation",
    why: "Unpaid work before you are hired can be a way to get free labour. Ask what the trial involves, how long it lasts, and whether it leads to a paid job in writing.",
    test: /\b(unpaid|without pay|no pay)\b.{0,50}\b(trial|probation|training|test (period|week|project)|internship)\b|\b(trial|probation|training)\b.{0,50}\b(unpaid|without pay)\b/i },
  { id: "employee_pays", weight: 35, title: "You are charged for costs",
    why: "Being charged for equipment, training, recruitment or visas, or having them deducted from pay, is unusual and often unlawful. Ask for the amounts and the law that allows it.",
    test: /\b(deduct(ed|ion)?|charge[ds]?|repay|reimburse)\b.{0,60}\b(equipment|laptop|training|uniform|recruitment|placement|visa|onboarding)\b/i },
  { id: "bond", weight: 35, title: "Penalty or bond for leaving",
    why: "A penalty for resigning, or a promise to stay for years, can trap you in a bad job. Check the amount and whether it is enforceable where you live.",
    test: /\b(bond|liquidated damages|penalty|forfeit)\b.{0,80}\b(leave|resign|quit|terminat|early|notice)\b|\bmust (stay|remain|work)\b.{0,30}\b(\d+|one|two|three)\s*(years?|months?)\b/i },
  { id: "vague_pay", weight: 30, title: "Pay is vague or commission-only",
    why: "You should know your pay before you accept. Ask for the exact amount, currency, pay date and how any commission is calculated.",
    test: /\bcommission[- ]only\b|\b(pay|salary|compensation)\b.{0,30}\b(to be (discussed|determined|agreed)|will be discussed)\b|\bperformance[- ]based (pay|salary)\b/i },
  { id: "ip_everything", weight: 25, title: "Employer claims everything you create",
    why: "Clauses that cover work you do in your own time can claim your side projects. Ask to limit it to work done for the employer.",
    test: /\b(all|any)\b.{0,40}\b(inventions?|work|ideas?|code|intellectual property)\b.{0,80}\b(whether or not|outside (of )?(working |work )?hours|on your own time|personal time)\b/i },
  { id: "noncompete", weight: 20, title: "Non-compete clause",
    why: "Check how long it lasts, where it applies, and what counts as a competitor. Broad ones can block you from working in your field.",
    test: /\bnon[- ]?compete\b|\bnot (to )?work for (any )?competitors?\b/i },
  { id: "no_notice", weight: 15, title: "Can end your job at any time without notice",
    why: "Some termination rules are normal. Check whether you also get notice, final pay and any severance.",
    test: /\b(terminate|dismiss)\b.{0,50}\b(at any time|without (prior )?notice|immediately)\b/i },
  { id: "no_pay_figure", weight: 20, title: "No pay amount found",
    why: "We could not find a salary or rate with a number in the text you pasted. If the full document has none, ask for it in writing.",
    custom: (t) => !/\b(salary|pay|compensation|rate|stipend|wage)\b.{0,80}\d/i.test(t) },
];

function reviewOffer(text) {
  const flags = RULES.filter((r) => (r.custom ? r.custom(text) : r.test.test(text)));
  const score = Math.min(100, flags.reduce((n, f) => n + f.weight, 0));
  const level = score >= 60 ? "high" : score >= 30 ? "medium" : score >= 10 ? "low" : "none";
  const headline = {
    high: "Serious concerns found. Do not sign until these are resolved in writing.",
    medium: "Some concerns found. Ask about them before you sign.",
    low: "A few points to check before you sign.",
    none: "No concerns found by these automatic checks. Still read the whole document.",
  }[level];
  return {
    level, score, headline,
    flags: flags.sort((a, b) => b.weight - a.weight).map(({ id, title, why }) => ({ id, title, why })),
    questions: [
      "Can you confirm my pay, currency and pay date in writing?",
      "What is my notice period, and what happens to my final pay if either side ends the job?",
      "Are there any fees, deductions or penalties that apply to me?",
    ],
    note: "This is an automatic check, not legal advice. Contract rules differ by country. If something worries you, ask a lawyer or your local labour office.",
  };
}
module.exports = { reviewOffer };