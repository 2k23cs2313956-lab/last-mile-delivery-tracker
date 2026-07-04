const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    createOrder,
    getMyOrders,
    failedDelivery
} = require("../controllers/orderController");

// Create Order (Customer)
router.post("/", protect, authorizeRoles("customer"), createOrder);

// Get My Orders (Customer)
router.get("/", protect, authorizeRoles("customer"), getMyOrders);

// Failed Delivery (Agent/Admin)
router.put(
    "/failed",
    protect,
    authorizeRoles("agent", "admin"),
    failedDelivery
);

module.exports = router;