const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Product', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Product database')
}).catch((err) => {
    console.log(err)
})

module.exports = mongoose.connection