const History = require('../models/historyModel');

const getHistory = async (req, res) => {
    try {
        const history = await History.findAll({
            order: [['timestamp', 'DESC']],
        });
        res.status(200).json(history);
    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).json({ error: "An error occurred while fetching history" });
    }
};

module.exports = { getHistory };
