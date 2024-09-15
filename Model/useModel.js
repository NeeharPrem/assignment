const db = require('../config/db');

const getCustomers = (callback) => {
    db.query('SELECT * FROM customers', callback);
};

module.exports = { getCustomers };