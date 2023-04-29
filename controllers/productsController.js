const { faker } = require('@faker-js/faker')
const Product = require('../models/product')
const mongoose = require('mongoose')


const createProduct = async (req, res) => {
    const { name, description, price, category, image, rating } = req.body
    try {
        const product = await Product.create({ name, description, price, category, image, rating })
        res.set('Content-Type', 'application/json')
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getProduct = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such product was found' })
        }
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ error: 'No such product' })
        }
        res.set('Content-Type', 'application/json')
        res.status(200).json(product)
    } catch (error) {

    }
}


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json(products)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such product was found' })
        }
        const product = await Product.findOneAndDelete({ _id: id })

        if (!product) {
            return res.status(400).json({ error: 'No such product' })
        }
        res.set('Content-Type', 'application/json')
        res.status(200).json(product)
    } catch (error) {

    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such product was found' })
        }
        const product = await Product.findOneAndUpdate({ _id: id }, {
            ...req.body
        })
        if (!product) {
            return res.status(400).json({ error: 'No such product' })
        }
        res.set('Content-Type', 'application/json')
        res.status(200).json(product)
    } catch (error) {

    }
}


const generateDummyProducts = async (req, res) => {
    console.log('running dummy generator')
    try {
        // Generating 10 dummy products using FakerJS
        console.log('Generating dummy records...')
        const dummies = []
        for (let i = 0; i < 10; i++) {
            const product = new Product({
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                category: faker.commerce.department(),
                image: faker.image.imageUrl(),
                rating: Math.ceil(Math.random() * 5),
            })
            console.log(product)
            dummies.push(product)
            await Product.create(product)
            console.log(`Inserted ${product.name} into the database`)
        }
        // Insert the dummy products into the database
        res.set('Content-Type', 'application/json')
        res.status(200).json({ message: 'Dummy products generated' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    createProduct,
    generateDummyProducts,
    getAllProducts,
    deleteProduct,
    updateProduct,
    getProduct
}