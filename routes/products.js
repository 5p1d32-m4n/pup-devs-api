const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const productController = require('../controllers/productsController')


// GET /products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// POST /products


// TEST population
router.post('/generate-dummy-products', productController.generateDummyProducts)

module.exports = router