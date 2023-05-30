const mongoose = require('mongoose')
require('dotenv').config()
const connectToDB = (databaseURI) => {
    console.log(`Connectino to ${databaseURI}`)
    return mongoose.createConnection(databaseURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = connectToDB