// Shared helper for the optional AI features (any OpenAI-compatible API).
const { mask } = require("./aiReview");
const aiEnabled = () => Boolean(process.env.AI_BASE_URL);

async function askJson(system, user) {
  if (!aiEnabled()) return null;
  try {
    const r = await fetch(`${process.env.AI_BASE_URL.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      signal: AbortSignal.timeout(40000),
      headers: { "content-type": "application/json", ...(process.env.AI_API_KEY && { authorization: `Bearer ${process.env.AI_API_KEY}` }) },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "llama-3.3-70b-versatile",
        temperature: 0.3,
        messages: [{ role: "system", content: system }, { role: "user", content: user }],
      }),
    });
    if (!r.ok) throw new Error("status " + r.status);
    const t = (await r.json()).choices?.[0]?.message?.content || "";
    return JSON.parse(t.slice(t.indexOf("{"), t.lastIndexOf("}") + 1));
  } catch (e) {
    console.error("AI request failed:", e.message);
    return null;
  }
}

// Runs the AI only when the user asked for it. Returns {} or { ai } or { aiError }.
async function withAi(wanted, system, user, tidy) {
  if (!wanted) return {};
  if (!aiEnabled()) return { aiError: "The AI part is not set up on this server." };
  const o = await askJson(system, user);
  return o ? { ai: tidy(o) } : { aiError: "The AI part could not be completed. The automatic result is still valid." };
}

const list = (a, n = 5, len = 300) => (Array.isArray(a) ? a : []).slice(0, n).map((x) => String(x).slice(0, len));
module.exports = { askJson, withAi, aiEnabled, mask, list };