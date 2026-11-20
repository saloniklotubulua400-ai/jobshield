// Tiny in-memory rate limiter (per IP). Fine for one server instance.
function rateLimit({ windowMs = 60000, max = 20 } = {}) {
  const hits = new Map();
  setInterval(() => {
    const cut = Date.now() - windowMs;
    for (const [ip, times] of hits) {
      const keep = times.filter((t) => t > cut);
      keep.length ? hits.set(ip, keep) : hits.delete(ip);
    }
  }, windowMs).unref();

  return (req, res, next) => {
    const now = Date.now();
    const recent = (hits.get(req.ip) || []).filter((t) => t > now - windowMs);
    if (recent.length >= max) {
      res.set("Retry-After", String(Math.ceil(windowMs / 1000)));
      return res.status(429).json({ success: false, message: "Too many requests. Please wait a minute and try again." });
    }
    recent.push(now);
    hits.set(req.ip, recent);
    next();
  };
}
module.exports = rateLimit;