const express = require('express');
const router = express.Router();
const { getRevenueAnalysis } = require('../controllers/revenueController');

router.get('/', getRevenueAnalysis);

// router.get('/', (req, res) => {
//     console.log('Revenue route accessed');
//     res.send('Revenue endpoint');
// });

module.exports = router;