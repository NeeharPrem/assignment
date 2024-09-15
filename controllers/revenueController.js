const { getMonthlyRevenue } = require('../Model/revenueModel');

const getRevenueAnalysis = (req, res) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
    }
    getMonthlyRevenue(startDate, endDate, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error retrieving revenue data' });
        }
        res.json(results);
    });
};

module.exports = { getRevenueAnalysis };