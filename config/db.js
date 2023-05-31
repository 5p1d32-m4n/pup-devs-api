const mongoose = require('mongoose')
require('dotenv').config()
const connectToDB = (databaseURI) => {
    console.log(`Connecting to ${databaseURI}`)
    return mongoose.createConnection(databaseURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

const PRODUCT_DB = connectToDB(process.env.PRODUCT_URI)
const DEPARTMENT_DB = connectToDB(process.env.DEPARTMENT_URI)

module.exports = { PRODUCT_DB, DEPARTMENT_DB }