const { getTopCustomers } = require('../Model/customerModel');

const getCustomers = (req, res) => {
    getTopCustomers((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to retrieve data', error: err });
        }
        res.status(200).json(results);
    });
};

module.exports = { getCustomers};