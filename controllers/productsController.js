const { faker } = require('@faker-js/faker')
const Product = require('../models/product')
const mongoose = require('mongoose')
const { PRODUCT_DB } = require('../config/db')

const createProduct = async (req, res) => {
    const { name, description, price, category, image, rating } = req.body
    try {
        const product = await PRODUCT_DB.collection('products').insertOne({ name, description, price, category, image, rating })
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
        const product = await PRODUCT_DB.collection('products').findOne({ _id: id })
        if (!product) {
            return res.status(404).json({ error: 'No such product' })
        }
        res.set('Content-Type', 'application/json')
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const getAllProducts = async (req, res) => {
    try {
        const products = await PRODUCT_DB.collection('products').find({}).sort({ createdAt: -1 }).toArray()
        res.json(products)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such product was found' })
        }
        const product = await PRODUCT_DB.collection('products').findOneAndDelete({ _id: id })

        if (!product) {
            return res.status(400).json({ error: 'No such product' })
        }
        res.set('Content-Type', 'application/json')
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such product was found' })
        }
        const product = await PRODUCT_DB.collection('products').findOneAndUpdate({ _id: id }, {
            ...req.body
        })
        if (!product) {
            return res.status(400).json({ error: 'No such product' })
        }
        res.set('Content-Type', 'application/json')
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


const generateDummyProducts = async (req, res) => {
    console.log('Generating dummy records...')
    try {
        for (let i = 0; i < 10; i++) {
            const product = new Product({
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                category: faker.commerce.department(),
                image: faker.image.abstract(width = 210, height = 235, randomize = true),
                rating: Math.ceil(Math.random() * 5),
            })
            console.log(product)
            await PRODUCT_DB.collection('products').insertOne(product)
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