const express = require('express');
const {getDishRequest} = require('../controllers/dishes');

const router = express.Router();

router.route('/dish').get(getDishRequest);

module.exports = router;