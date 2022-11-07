const express = require('express');
const {getAllOrders} = require('../controllers/chefs');
const authenticationMiddleware = require('../Middleware/auth');
const cache = require('../Middleware/cache');

const router = express.Router();

router.route('/chef/:name').post(authenticationMiddleware, getAllOrders);

module.exports = router;