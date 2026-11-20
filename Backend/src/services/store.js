// Simple JSON-file storage so the server works with nothing to install.
// Later you can replace this file with Supabase, Firebase or MongoDB calls.
const fs = require("fs");
const path = require("path");

const FILE = process.env.DATA_FILE || path.join(__dirname, "..", "data.json");
const db = { users: [], applications: [] };
try { Object.assign(db, JSON.parse(fs.readFileSync(FILE, "utf8"))); } catch {}

const save = () => {
  fs.writeFileSync(FILE + ".tmp", JSON.stringify(db));
  fs.renameSync(FILE + ".tmp", FILE);
};
module.exports = { db, save };