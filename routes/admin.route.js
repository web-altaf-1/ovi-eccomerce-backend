const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin.controller');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/login', adminController.makeLoginAdmin);
router.get('/me', verifyToken, adminController.getMe);
router.get('/products/bulk', adminController.getAllProductsForAdmin);
router.get('/product/:slug', adminController.getAdminProductDetails);
module.exports = router;