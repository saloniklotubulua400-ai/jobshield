const crypto = require("crypto");
const { promisify } = require("util");
const scrypt = promisify(crypto.scrypt);
const { db, save } = require("../services/store");
const { makeToken } = require("../services/auth");

const hashPw = async (pw, salt) => (await scrypt(pw, salt, 64)).toString("hex");
const same = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
const pub = (u) => ({ id: u.id, email: u.email, name: u.name });
const fail = (res, code, message) => res.status(code).json({ success: false, message });

exports.signup = async (req, res, next) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const pw = String(req.body?.password || "");
    const name = String(req.body?.name || "").trim().slice(0, 80);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 120) return fail(res, 400, "Enter a valid email address.");
    if (pw.length < 8 || pw.length > 200) return fail(res, 400, "Use a password of at least 8 characters.");
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = await hashPw(pw, salt);
    if (db.users.some((u) => u.email === email)) return fail(res, 409, "That email already has an account. Log in instead.");
    const user = { id: crypto.randomUUID(), email, name, salt, hash, createdAt: Date.now() };
    db.users.push(user); save();
    res.status(201).json({ success: true, token: makeToken(user), user: pub(user) });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const user = db.users.find((u) => u.email === email);
    const hash = await hashPw(String(req.body?.password || ""), user ? user.salt : "0".repeat(32));
    if (!user || !same(hash, user.hash)) return fail(res, 401, "Wrong email or password.");
    res.json({ success: true, token: makeToken(user), user: pub(user) });
  } catch (e) { next(e); }
};

exports.me = (req, res) => res.json({ success: true, user: pub(req.user) });