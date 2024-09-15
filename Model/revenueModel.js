const db = require('../config/db');

const getMonthlyRevenue = (startDate, endDate, callback) => {
    db.query(`
        SELECT DATE_FORMAT(order_date, '%Y-%m') AS month, SUM(order_amount) AS total_revenue
        FROM orders
        WHERE order_date BETWEEN ? AND ?
        GROUP BY DATE_FORMAT(order_date, '%Y-%m')
        ORDER BY month
    `, [startDate, endDate], callback);
};

module.exports = { getMonthlyRevenue };