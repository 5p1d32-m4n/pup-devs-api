const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String }
})

const Department = mongoose.model('Department', departmentSchema, 'departments')

module.exports = Department