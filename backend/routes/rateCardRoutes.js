const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    createRateCard,
    getRateCards
} = require("../controllers/rateCardController");

// Only Admin can create rate cards
router.post("/", protect, authorizeRoles("admin"), createRateCard);

// Everyone logged in can view
router.get("/", protect, getRateCards);

module.exports = router;