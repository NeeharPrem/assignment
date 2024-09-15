const express = require('express');
const router = express.Router();
const { getRevenueProjections } = require('../controllers/projectionController');

router.get('/', getRevenueProjections);

module.exports = router;