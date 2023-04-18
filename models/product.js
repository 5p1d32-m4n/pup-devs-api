const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, },
    price: { type: Number, required: true },
    category: { type: String, },
    image: { type: String, },
    rating: { type: Number, },
    //   TODO: implement reviews after you've made a user schema and others
    //   reviews: [{
    //     user_id: mongoose.Schema.Types.ObjectId,
    //     rating: Number,
    //     comment: String
    //   }]
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

module.exports = Product