const express = require('express');
const router = express.Router();

const orderController = require('../controller/order.controller');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/create-new-order', orderController.createNewOrder);
module.exports = router;