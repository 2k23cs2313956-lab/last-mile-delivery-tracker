const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    addTracking,
    getTracking
} = require("../controllers/trackingController");

// Only Admin and Agent can update tracking
router.post(
    "/",
    protect,
    authorizeRoles("admin", "agent"),
    addTracking
);

// Any logged-in user can view tracking
router.get(
    "/:orderId",
    protect,
    getTracking
);

module.exports = router;