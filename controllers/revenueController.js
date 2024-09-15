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

        const revenues = results.map(row => row.total_revenue);
        const growthRates = revenues.map((revenue, index) => {
            if (index === 0) {
                return null; 
            }
            const previousRevenue = revenues[index - 1];
            const change = revenue - previousRevenue;
            const growthRate = ((change) / previousRevenue) * 100;

            return parseFloat(growthRate.toFixed(2));
        });

        const resultsWithGrowth = results.map((row, index) => {
            return {
                ...row,
                growth_rate: growthRates[index]
            };
        });

        res.json(resultsWithGrowth);
    });
};

module.exports = { getRevenueAnalysis };