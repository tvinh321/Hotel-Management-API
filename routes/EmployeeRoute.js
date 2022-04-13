const router = require('express').Router()
const controller = require('../controllers/EmployeeController')

router.get("/findByFloor", controller.getEmployeeOnFloor)

router.post("/add", controller.addEmployee)

module.exports = router