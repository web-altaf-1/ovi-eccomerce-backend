const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin.controller');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/login', adminController.makeLoginAdmin);
router.get('/me', verifyToken, adminController.getMe);
router.get('/products/bulk', adminController.getAllProductsForAdmin);
// router.get('/product/:slug', adminController.getAdminProductDetails);

router.route("/product/:slug")
    .get(adminController.getAdminProductDetails)

router.route("/product")
    .post(adminController.createNewProductFromAdmin)

router.get('/get-all-orders', adminController.getAdminAllOrders);
router.delete('/delete-order/:id', adminController.deleteOrderByOrderId);
router.get('/get-order-details/:id', adminController.getAdminOrderDetailsByOrderId);
module.exports = router;