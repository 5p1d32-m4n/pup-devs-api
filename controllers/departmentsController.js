const { faker } = require('@faker-js/faker')
const Department = require('../models/department')
const mongoose = require('mongoose')

const createDepartment = async (req, res) => {
    const { name, image } = req.body
    try {
        const department = await Department.create({
            name,
            image
        })
        res.set('Content-Type', 'application/json')
        res.status(200).json(department)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDepartment = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such department was found.' })
        }
        const department = await Department.findById(id)
        if (!department) {
            return res.status(404).json({ error: 'No such department.' })
        }
        res.set('Content-Type', 'application/json')
        res.status(200).json(department)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllDepartments = async (req, res) => {
    try {
        const department = await Department.find({}).sort({ name: 1 })
        res.json(department)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deleteDepartment = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such department was found' })
        }
        const department = await Department.findOneAndDelete({ _id: id })

        if (!department) {
            return res.status(400).json({ error: 'No such department' })
        }
        res.set('Content-Type', 'application/json')
        res.status(200).json(department)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const updateDepartment = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such department was found' })
        }
        const department = await Department.findOneAndDelete({ _id: id }, {
            ...req.body
        })
        if (!department) {
            return res.status(400).json({ error: 'No such department' })
        }
        res.set('Content-Type', 'application/json')
        res.status(200).json(department)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const generateDummyDepartments = async (req, res) => {
    console.log('Generating dummy departments')
    try {
        const dummies = []
        for (let index = 0; index < 10; index++) {
            const department = new Department({
                name: faker.commerce.department(),
                image: faker.image.abstract(width = 280, height = 305, randomize = true)
            })
            console.log(department)
            await Department.create(department)
            console.log(`Inserted ${department.name} into the database`)
        }
        res.set('Content-Type', 'application/json')
        res.status(200).json({ message: 'Dummy departments generated' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    createDepartment,
    getDepartment,
    getAllDepartments,
    deleteDepartment,
    updateDepartment,
    generateDummyDepartments,
}