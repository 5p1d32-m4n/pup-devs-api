const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Product = require('./models/product')
const Department = require('./models/department')

const productsRouter = require('./routes/productsRouter')
const departmentRouter = require('./routes/departmentsRouter')

app.use(express.json())
app.use(cors({ origin: '*' }))
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
})



/**
 * Mount the products router at /products
*/
app.use('/api/products', productsRouter)
app.use('/api/departments', departmentRouter)


/** 
 * Default welcome route
*/
app.use('/', (req, res) => {
    res.json({ msg: 'Welcom to the PupDev API!' })
})

/**
 * Connection to the DB
 */
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