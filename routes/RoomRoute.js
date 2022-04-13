const router = require('express').Router()
const controller = require('../controllers/RoomController')

router.get("/findByGuest", controller.findRoomByGuest)
router.get("/findInfo/:num", controller.findRoomInfo)
router.get("/getAll", controller.getAllRoom)

router.post("/add", controller.addRoom)

module.exports = router