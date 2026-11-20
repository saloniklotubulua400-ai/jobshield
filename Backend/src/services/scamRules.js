// Rule-based red-flag checker for job messages. No dependencies.
// It reports red flags it finds. It never says a job is "safe".
const FREE_MAIL = /^(gmail|googlemail|yahoo|outlook|hotmail|live|aol|icloud|proton|protonmail|mail|gmx|zoho)\.[a-z.]+$/i;

const RULES = [
  { id: "upfront_fee", weight: 35, title: "Asks you to pay money",
    why: "Real employers do not charge for applying, training, equipment, software, visas or background checks.",
    test: /\b(registration|training|processing|application|admin|security|equipment|starter kit|software|visa|onboarding)\s+(fee|cost|payment|deposit)s?\b|\b(pay|send|transfer|deposit)\b.{0,40}\b(fee|deposit|bitcoin|btc|usdt)\b|\bpay for (your |the )?(training|equipment|laptop|software|kit)\b/i },
  { id: "cheque", weight: 35, title: "Cheque or advance-payment scheme",
    why: "A common scam sends a cheque, asks you to keep part of it and send the rest to a vendor. The cheque later bounces and you lose the money.",
    test: /\b(cheque|check)\b.{0,100}\b(deposit|cash|buy|purchase|equipment|vendor|send back|remaining|balance|forward)\b|\bwe (will|'ll) (send|mail) you a (cheque|check)\b|\bsend (the )?(remaining|balance|extra)\b/i },
  { id: "task_scam", weight: 45, title: "Task or rating job where you deposit money",
    why: "\"Complete daily tasks\", rating products or boosting orders for commission, then topping up an account, is a widespread scam pattern.",
    test: /\bcomplete (your )?(daily )?tasks?\b|\bcombination tasks?\b|\brecharge (your )?(account|wallet)\b|\b(rate|like|review|boost|optimi[sz]e)\b.{0,40}\b(products?|videos?|apps?|hotels?|orders?)\b.{0,100}\b(commission|earn|paid)\b/i },
  { id: "personal_data", weight: 40, title: "Asks for ID or bank details very early",
    why: "Legitimate employers ask for ID and bank details only after a signed offer, through official onboarding.",
    test: /\b(ssn|social security( number)?|passport (copy|scan|photo|number)|bank (account|login|details|statement)|routing number|driver'?s licen[cs]e|national id (photo|copy|number))\b/i },
  { id: "crypto_cards", weight: 25, title: "Mentions crypto or gift cards",
    why: "Employers do not pay or collect money in gift cards or cryptocurrency.",
    test: /\b(bitcoin|btc|usdt|ethereum|crypto(currency)?|gift ?cards?|itunes card|steam card|google play card)\b/i },
  { id: "no_interview", weight: 20, title: "Hired with no real interview",
    why: "Offers made instantly, with no interview, are a common sign of a scam.",
    test: /\byou('| a)?re hired\b|\bno interview (is )?(needed|required)\b|\b(hired|selected|offered)\b.{0,40}\bwithout (an |any )?interview\b/i },
  { id: "chat_only", weight: 20, title: "Interview or hiring only on a chat app",
    why: "Hiring done only through Telegram, WhatsApp or Signal, with no video call or company email, is a common scam pattern.",
    test: /\b(telegram|whatsapp|signal|google hangouts|text message)\b.{0,60}\binterview\b|\binterview\b.{0,60}\b(telegram|whatsapp|signal|hangouts|text message)\b|\b(contact|message|add) (me|us|our (hr|recruiter|manager)).{0,40}\b(telegram|whatsapp)\b/i },
  { id: "too_good", weight: 15, title: "Pay looks too good for the work",
    why: "Very high pay for easy work with no experience is a classic lure.",
    test: /\$\s?\d{3,}\s*(\/|per|a)\s*(day|hour|hr)\b|\bearn\s+\$?\d{3,}.{0,25}\b(daily|a day|per day|weekly|a week)\b|\bno experience (is )?(needed|required|necessary)\b.{0,120}\$\s?\d/i },
  { id: "free_email", weight: 10, title: "Recruiter uses a free email address",
    why: "Real companies usually write from their own domain. Check the company's official website and contact page.",
    custom: (text) => emails(text).some((d) => FREE_MAIL.test(d)) },
  { id: "urgency", weight: 10, title: "Pressure to act fast",
    why: "Scammers rush you so you do not stop to check.",
    test: /\b(urgent(ly)?|immediately|within 24 hours|today only|limited (slots?|spots?|positions?)|act now|respond asap)\b/i },
];

function emails(text) {
  return [...text.matchAll(/[\w.+-]+@([\w-]+(?:\.[\w-]+)+)/g)].map((m) => m[1].toLowerCase());
}
const cleanDomain = (d) => String(d || "").toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[/?#]/)[0].trim();

function analyze(text, { companyDomain } = {}) {
  const flags = [];
  for (const r of RULES) {
    const hit = r.custom ? r.custom(text) : r.test.test(text);
    if (hit) flags.push({ id: r.id, title: r.title, why: r.why, weight: r.weight });
  }
  const dom = cleanDomain(companyDomain);
  if (dom) {
    const bad = emails(text).filter((d) => !FREE_MAIL.test(d) && d !== dom && !d.endsWith("." + dom));
    if (bad.length) flags.push({ id: "domain_mismatch", weight: 20, title: "Email domain does not match the company website",
      why: `The message uses ${bad[0]}, but the company website you gave is ${dom}. Look-alike domains are a common trick.` });
  }
  const score = Math.min(100, flags.reduce((n, f) => n + f.weight, 0));
  const level = score >= 60 ? "high" : score >= 30 ? "medium" : score >= 10 ? "low" : "none";
  const headline = {
    high: "Several serious red flags found. Do not send money or personal documents.",
    medium: "Some red flags found. Verify the employer independently before replying.",
    low: "A minor red flag found. Check the details before sharing anything.",
    none: "No red flags found by these automatic checks. That does not prove the job is real.",
  }[level];
  return {
    level, score, headline,
    flags: flags.sort((a, b) => b.weight - a.weight).map(({ id, title, why }) => ({ id, title, why })),
    advice: [
      "Find the company's official website yourself (do not use links from the message) and contact them through it.",
      "Never pay to get a job, and never send ID or bank details before a signed offer.",
      "Search the company name with the word \"scam\" and check the recruiter on LinkedIn.",
    ],
    note: "This is an automatic check based on common scam patterns. It can miss scams and can flag genuine messages.",
  };
}
module.exports = { analyze };