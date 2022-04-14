const router = require('express').Router()
const controller = require('../controllers/EmployeeController')

router.get("/findByFloor", controller.getByFloor)

router.post("/", controller.add)

router.put("/changePosition", controller.changePosition)
router.put("/changeFloor", controller.changeFloor)

router.delete("/:id", controller.remove)

module.exports = router