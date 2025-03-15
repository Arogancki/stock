const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.post('/:id/restock', productController.restockProduct);
router.post('/:id/sell', productController.sellProduct);

module.exports = router;
