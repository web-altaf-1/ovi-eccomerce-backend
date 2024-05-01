const express = require('express');
const router = express.Router();

const orderController = require('../controller/order.controller');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/create-new-order', orderController.createNewOrder);
router.get('/get-single-order/:id', orderController.getSingleOrderByOrderId);
router.get('/order-tracking/:id', orderController.getOrderTrack);
router.post('/update-order-download-status/:id', orderController.updateOrderDownloadStatus);
router.patch('/update-order-status', orderController.updateOrderStatus);
module.exports = router;