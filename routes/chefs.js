const express = require('express');
const {getAllOrders} = require('../controllers/chefs');

const router = express.Router();

router.route('/chef/:name').get(getAllOrders);

module.exports = router;