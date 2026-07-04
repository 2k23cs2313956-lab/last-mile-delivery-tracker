const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    status: {
        type: String,
        enum: [
            "Created",
            "Picked Up",
            "In Transit",
            "Out For Delivery",
            "Delivered",
            "Failed"
        ],
        required: true
    },

    location: {
        type: String,
        default: "Warehouse"
    },

    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    remarks: {
        type: String,
        default: ""
    }

}, { timestamps: true });

module.exports = mongoose.model("Tracking", trackingSchema);