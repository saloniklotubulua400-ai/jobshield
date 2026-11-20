const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const checkRoutes = require("./routes/check.routes");
const rateLimit = require("./middleware/rateLimit");
const requireAuth = require("./middleware/requireAuth");
const checkRoutes = require("./routes/check.routes");
const authRoutes = require("./routes/auth.routes");
const applicationsRoutes = require("./routes/applications.routes");
const toolsRoutes = require("./routes/tools.routes");
const app = express();

const rateLimit = require("./middleware/rateLimit");
app.set("trust proxy", 1); // keep only when hosted behind a proxy (Render, Railway, etc.)

app.use("/api/auth", rateLimit({ windowMs: 60 * 1000, max: 10 }), authRoutes);
app.use("/api", rateLimit({ windowMs: 60 * 1000, max: 30 }));
app.use("/api/applications", requireAuth, applicationsRoutes);
app.use("/api", checkRoutes);
app.use("/api", toolsRoutes);
app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "2mb" }));

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.set("trust proxy", 1); // keep this only when hosted behind a proxy (Render, Railway, etc.)
app.use("/api", rateLimit({ windowMs: 60 * 1000, max: 20 }), checkRoutes);

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "JobShield API is running 🚀"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", time: new Date().toISOString() });
});

// "Is this job real?" checker
app.use("/api", checkRoutes);

// Unknown routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Errors (bad JSON, etc.)
app.use((err, req, res, next) => {
    const status = err.status || 500;
    if (status === 500) console.error(err);
    res.status(status).json({ success: false, message: status === 500 ? "Something went wrong on the server." : err.message });
});

module.exports = app;