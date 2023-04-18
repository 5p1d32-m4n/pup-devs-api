const { faker } = require('@faker-js/faker')
const Product = require('../models/product')

const generateDummyProducts = async (req, res) => {
    try {
        // Generating 10 dummy products using FakerJS
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
        }
        console.log('Generating dummy records...')
        // Insert the dummy products into the database
        res.status(200).json({ message: 'Dummy products generated' })
    } catch (err) {
        console.log(err)
    }
}

module.exports = { generateDummyProducts }