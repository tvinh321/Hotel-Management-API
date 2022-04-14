const router = require('express').Router()
const controller = require('../controllers/GuestController')

router.get("/getAll", controller.getAll)
router.get("/find", controller.find)

router.post("/", controller.add)

module.exports = router