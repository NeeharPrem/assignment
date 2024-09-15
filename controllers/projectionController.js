const { getMonthlyRevenue } = require('../Model/revenueModel');

const getRevenueProjections = (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
    }

    getMonthlyRevenue(startDate, endDate, (err, results) => {
        if (err) {
            console.error('Error in getRevenueProjections:', err);
            return res.status(500).json({ error: 'Error retrieving revenue data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No data found for the given date range' });
        }
        const projections = calculateProjection(results);
        res.json(projections);
    });
};

const calculateProjection = (data) => {
    if (data.length === 0) return [];

    const revenues = data.map(row => parseFloat(row.total_revenue));
    const average = revenues.reduce((a, b) => a + b, 0) / revenues.length;

    const lastMonth = new Date(data[data.length - 1].month + '-01');

    return Array.from({ length: 3 }, (_, i) => {
        const projectedMonth = new Date(lastMonth);
        projectedMonth.setMonth(lastMonth.getMonth() + i + 1);
        return {
            month: projectedMonth.toISOString().slice(0, 7),
            projected_revenue: Number(average.toFixed(2))
        };
    });
};

module.exports = { getRevenueProjections };