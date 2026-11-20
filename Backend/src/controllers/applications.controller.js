const crypto = require("crypto");
const { db, save } = require("../services/store");

const STATUSES = ["saved", "applied", "interviewing", "offer", "rejected", "withdrawn"];
const MAX_PER_USER = 200;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const str = (v, n) => String(v ?? "").trim().slice(0, n);

function followUpDue(a, now = Date.now()) {
  if (!["applied", "interviewing"].includes(a.status)) return false;
  if (a.followUpDate) return a.followUpDate <= new Date(now).toISOString().slice(0, 10);
  return a.status === "applied" && now - a.appliedAt > 7 * 864e5;
}
const view = ({ userId, ...a }) => ({ ...a, followUpDue: followUpDue(a) });

// Validates the fields that were sent. Returns { error } or { fields }.
function readFields(body, partial) {
  const f = {};
  if (!partial || "company" in body) { f.company = str(body.company, 100); if (!f.company) return { error: "Enter the company name." }; }
  if (!partial || "role" in body) { f.role = str(body.role, 100); if (!f.role) return { error: "Enter the job title." }; }
  if ("url" in body) { f.url = str(body.url, 300); if (f.url && !/^https?:\/\//i.test(f.url)) return { error: "The link must start with http:// or https://" }; }
  if ("notes" in body) f.notes = str(body.notes, 2000);
  if ("status" in body) { if (!STATUSES.includes(body.status)) return { error: "Status must be one of: " + STATUSES.join(", ") }; f.status = body.status; }
  if ("followUpDate" in body) { f.followUpDate = str(body.followUpDate, 10); if (f.followUpDate && !DATE.test(f.followUpDate)) return { error: "Use the date format YYYY-MM-DD." }; }
  return { fields: f };
}

exports.list = (req, res) => {
  const items = db.applications.filter((a) => a.userId === req.user.id).sort((a, b) => b.updatedAt - a.updatedAt);
  res.json({ success: true, applications: items.map(view) });
};

exports.create = (req, res) => {
  const { error, fields } = readFields(req.body || {}, false);
  if (error) return res.status(400).json({ success: false, message: error });
  if (db.applications.filter((a) => a.userId === req.user.id).length >= MAX_PER_USER)
    return res.status(402).json({ success: false, message: `You have reached ${MAX_PER_USER} applications.` });
  const now = Date.now();
  const app = { id: crypto.randomUUID(), userId: req.user.id, url: "", notes: "", followUpDate: "", status: "saved", ...fields, createdAt: now, updatedAt: now };
  if (app.status === "applied") app.appliedAt = now;
  db.applications.push(app); save();
  res.status(201).json({ success: true, application: view(app) });
};

exports.update = (req, res) => {
  const app = db.applications.find((a) => a.id === req.params.id && a.userId === req.user.id);
  if (!app) return res.status(404).json({ success: false, message: "Application not found." });
  const { error, fields } = readFields(req.body || {}, true);
  if (error) return res.status(400).json({ success: false, message: error });
  Object.assign(app, fields, { updatedAt: Date.now() });
  if (app.status === "applied" && !app.appliedAt) app.appliedAt = Date.now();
  save();
  res.json({ success: true, application: view(app) });
};

exports.remove = (req, res) => {
  const i = db.applications.findIndex((a) => a.id === req.params.id && a.userId === req.user.id);
  if (i === -1) return res.status(404).json({ success: false, message: "Application not found." });
  db.applications.splice(i, 1); save();
  res.json({ success: true });
};