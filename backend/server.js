const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/database");

// Connect Database
connectDB();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
const protect = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const agentRoutes = require("./routes/agentRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const rateCardRoutes = require("./routes/rateCardRoutes");

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
    res.status(200).send("Last Mile Delivery Tracker Backend Running 🚀");
});

app.get("/api", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is working 🚀"
    });
});

// ================= API ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/ratecards", rateCardRoutes);

// ================= ROLE TEST ROUTES =================
app.get("/customer", protect, authorizeRoles("customer"), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Customer",
        user: req.user
    });
});

app.get("/agent", protect, authorizeRoles("agent"), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Agent",
        user: req.user
    });
});

app.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Admin",
        user: req.user
    });
});

// ================= ERROR HANDLING =================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});