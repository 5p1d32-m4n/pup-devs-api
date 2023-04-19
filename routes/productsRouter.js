const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const { generateDummyProducts, createProduct } = require('../controllers/productsController')


// GET /products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json(products)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// POST /products
router.post('/create-product', createProduct)

// TEST population
router.post('/generate-dummy-products', generateDummyProducts)

module.exports = router