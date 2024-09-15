const db = require('../config/db');

const getCustomers = (callback) => {
    db.query('SELECT * FROM customers', callback);
};

const getTopCustomers = (callback) => {
    db.query(`
        SELECT c.name AS customer_name, SUM(o.order_amount) AS total_revenue
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        GROUP BY c.name
        ORDER BY total_revenue DESC
        LIMIT 10;
    `, callback);
};

module.exports = { getCustomers,getTopCustomers};