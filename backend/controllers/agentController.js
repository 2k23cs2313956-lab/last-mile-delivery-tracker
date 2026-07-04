const Agent = require("../models/Agent");

// CREATE AGENT (ADMIN)
const createAgent = async (req, res) => {
    try {
        const { name, email, phone, zone } = req.body;

        const existing = await Agent.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Agent already exists" });
        }

        const agent = await Agent.create({
            name,
            email,
            phone,
            zone
        });

        res.status(201).json({
            message: "Agent created successfully",
            agent
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL AGENTS
const getAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createAgent, getAgents };