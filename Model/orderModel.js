const db = require('../config/db');

const getOrders = (callback) => {
    db.query('SELECT * FROM orders', callback);
};

module.exports = { getOrders };