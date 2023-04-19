const { faker } = require('@faker-js/faker')
const Product = require('../models/product')


const createProduct = async (req, res) => {
    const { name, description, price, category, image, rating } = req.body
    try {
        const product = await Product.create({ name, description, price, category, image, rating })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const getProduct = async (req, res) => {
    const { id } = req.params
    try {

    } catch (error) {

    }
}
const getAllProducts = async (req, res) => { }
const updateProduct = async (req, res) => { }
const deleteProduct = async (req, res) => { }
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
        res.status(200).json({ message: 'Dummy products generated' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = {
    createProduct,
    generateDummyProducts
}