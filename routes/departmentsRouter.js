const express = require('express')
const router = express.Router()
const Department = require('../models/department')
const { createDepartment, deleteDepartment, generateDummyDepartments, getAllDepartments, getDepartment, updateDepartment } = require('../controllers/departmentsController')

/* 
GET departments
*/
router.get('/', getAllDepartments)
router.get('/:id', getDepartment)

/* 
POST departments
*/
router.post('/create-department', createDepartment)

/* 
UPDATE departments
*/
router.patch('/:id', updateDepartment)

/* 
DELETE departments
*/
router.delete('/:id', deleteDepartment)

/* 
TEST departments
*/
router.post('/generate-dummy-departments', generateDummyDepartments)

module.exports = router