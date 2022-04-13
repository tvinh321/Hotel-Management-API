const router = require('express').Router()
const controller = require('../controllers/GuestController')

router.get("/getAll", controller.getAllGuests)
router.get("/find", controller.findGuest)

router.post("/add", controller.addGuest)

module.exports = router