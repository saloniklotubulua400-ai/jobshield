const { readToken } = require("../services/auth");
const { db } = require("../services/store");

module.exports = (req, res, next) => {
  const token = (req.get("authorization") || "").replace(/^Bearer /, "");
  const data = readToken(token);
  const user = data && db.users.find((u) => u.id === data.sub);
  if (!user) return res.status(401).json({ success: false, message: "Please log in." });
  req.user = user;
  next();
};