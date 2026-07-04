const Tracking = require("../models/Tracking");
const Order = require("../models/Order");

// Add Tracking Update
const addTracking = async (req, res) => {
    try {

        const {
            orderId,
            status,
            location,
            remarks
        } = req.body;

        // Check Order
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // Create Tracking Entry
        const track = await Tracking.create({
            order: orderId,
            status,
            location,
            remarks,
            updatedBy: req.user.id
        });

        // Update Order Status
        order.status = status;
        await order.save();

        res.status(201).json({
            message: "Tracking Updated Successfully",
            tracking: track
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get Tracking History
const getTracking = async (req, res) => {

    try {

        const history = await Tracking.find({
            order: req.params.orderId
        })
        .populate("updatedBy", "name role")
        .sort({
            createdAt: 1
        });

        res.status(200).json(history);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    addTracking,
    getTracking
};