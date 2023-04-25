const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const { generateDummyProducts, createProduct, getProduct, getAllProducts, deleteProduct, updateProduct } = require('../controllers/productsController')


// GET /products
router.get('/', getAllProducts)

router.get('/:id', getProduct)

// POST /products
router.post('/create-product', createProduct)

// UPDATE products
router.patch('/:id', updateProduct)

// DELETE 
router.delete('/:id', deleteProduct)

// TEST population
router.post('/generate-dummy-products', generateDummyProducts)

module.exports = router