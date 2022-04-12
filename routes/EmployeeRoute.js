const router = require('express').Router()
const controller = require('../controllers/EmployeeController')

router.get("/getEmployeeOnFloor", controller.getEmployeeOnFloor)

module.exports = router