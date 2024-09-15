const express = require('express');
const router = express.Router();
const { getProjection} = require('../controllers/projectionController');

router.get('/', getProjection);

module.exports = router;