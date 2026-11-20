// Keyword comparison between a CV and a job post. A rough guide, not a score of your worth.
const STOP = new Set("a an and are as at be by for from has have in is it of on or that the to with will you your we our this their they them who what when where which while can able must should would about across into over than then also more most such other new etc per via within including include includes plus e.g i.e us not but if so do does all any both each how its out up".split(" "));
const GENERIC = new Set("experience team work working role company position looking strong ability skills skill years year required preferred responsibilities responsible candidate join help job opportunity knowledge understanding excellent good great using use used make building build develop developing across ensure support environment business client clients project projects need needs great well part time full".split(" "));
const stem = (w) => (w.length > 4 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w);
const SKILLS = new Set("javascript typescript react node express python django flask fastapi sql postgresql mysql mongodb firebase supabase aws azure docker kubernetes git github linux html css tailwind figma photoshop illustrator indesign sketch java kotlin swift php laravel wordpress shopify seo analytics excel tableau powerbi agile scrum jira api graphql jest cypress redux nextjs vue angular golang rust".split(" ").map(stem));

const tokens = (t) => t.toLowerCase().match(/[a-z][a-z0-9+#.]*[a-z0-9+#]/g) || [];

function jobTerms(job) {
  const count = new Map();
  for (const w of tokens(job)) {
    if (STOP.has(w) || GENERIC.has(w) || w.length < 3) continue;
    const s = stem(w);
    const e = count.get(s) || { term: w, stem: s, n: 0 };
    e.n++; count.set(s, e);
  }
  return [...count.values()]
    .filter((e) => e.n >= 2 || SKILLS.has(e.stem))
    .sort((a, b) => b.n - a.n || b.term.length - a.term.length)
    .slice(0, 25);
}

function keywordGap(cv, job) {
  const have = new Set(tokens(cv).map(stem));
  const terms = jobTerms(job);
  const matched = terms.filter((t) => have.has(t.stem)).map((t) => t.term);
  const missing = terms.filter((t) => !have.has(t.stem)).map((t) => t.term);
  return {
    matchPercent: terms.length ? Math.round((matched.length / terms.length) * 100) : 0,
    matched, missing,
    note: "This is a rough keyword comparison. Add a missing word only if it is true for you. Never claim skills or experience you do not have.",
  };
}
module.exports = { keywordGap, jobTerms };