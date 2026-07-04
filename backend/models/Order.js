const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    pickupZone: {
        type: String,
        required: true
    },

    dropZone: {
        type: String,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    length: {
        type: Number,
        default: 0
    },

    breadth: {
        type: Number,
        default: 0
    },

    height: {
        type: Number,
        default: 0
    },

    billableWeight: {
        type: Number,
        default: 0
    },

    shipmentType: {
        type: String,
        enum: ["B2B", "B2C"],
        default: "B2C"
    },

    isCOD: {
        type: Boolean,
        default: false
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
        default: "Created"
    },

    amount: {
        type: Number,
        required: true
    },

    assignedAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent",
        default: null
    },

    failureReason: {
        type: String,
        default: ""
    },

    rescheduleDate: {
        type: Date,
        default: null
    }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);