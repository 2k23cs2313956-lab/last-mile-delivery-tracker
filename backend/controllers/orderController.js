const Order = require("../models/Order");
const Agent = require("../models/Agent");
const RateCard = require("../models/RateCard");
const Tracking = require("../models/Tracking");

// ================= CREATE ORDER =================

const createOrder = async (req, res) => {
    try {

        const {
            pickupZone,
            dropZone,
            weight,
            length,
            breadth,
            height,
            shipmentType,
            isCOD
        } = req.body;

        const volumetricWeight = (length * breadth * height) / 5000;
        const billableWeight = Math.max(weight, volumetricWeight);

        const rate = await RateCard.findOne({ shipmentType });

        if (!rate) {
            return res.status(404).json({
                message: "Rate Card not found"
            });
        }

        let amount = rate.baseRate + (billableWeight * rate.ratePerKg);

        if (isCOD) {
            amount += rate.codCharge;
        }

        const agent = await Agent.findOne({
            zone: pickupZone
        });

        const order = await Order.create({
            customer: req.user.id,
            pickupZone,
            dropZone,
            weight,
            length,
            breadth,
            height,
            shipmentType,
            isCOD,
            billableWeight,
            amount,
            assignedAgent: agent ? agent._id : null
        });

        res.status(201).json({
            message: "Order created successfully",
            order,
            assignedAgent: agent
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ================= MY ORDERS =================

const getMyOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            customer: req.user.id
        }).populate("assignedAgent");

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ================= FAILED DELIVERY =================

const failedDelivery = async (req, res) => {

    try {

        const {
            orderId,
            failureReason,
            rescheduleDate
        } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // Update order
        order.status = "Failed";
        order.failureReason = failureReason;
        order.rescheduleDate = rescheduleDate;
        order.assignedAgent = null;

        await order.save();

        // Create tracking history
        await Tracking.create({
            order: order._id,
            status: "Failed",
            location: "Delivery Address",
            remarks: failureReason,
            updatedBy: req.user.id
        });

        res.json({
            message: "Delivery marked as Failed",
            order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createOrder,
    getMyOrders,
    failedDelivery
};