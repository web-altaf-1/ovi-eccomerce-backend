const express = require('express');
const router = express.Router();

const productController = require('../controller/product.controller');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/create-new-product', productController.createNewProduct);
router.get('/get-all-products', productController.getAllProducts);
router.get('/get-product-details/:slug', productController.getProductDetailsById);

module.exports = router;