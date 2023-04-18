const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const productsRouter = require('./routes/products')

app.use(express.json())

app.use('/', (req, res) => {
    res.json({ msg: 'Welcom to the PupDev API!' })
})

// Mount the products router at /products
app.use('/products', productsRouter)

// Connection to the DB
console.log(process.env.DB_URI)
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// Starting the server
