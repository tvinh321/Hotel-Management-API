const router = require('express').Router()
const controller = require('../controllers/RoomController')

router.get("/findRoomByGuest", controller.findRoomByGuest)
router.get("/findRoomInfo", controller.findRoomInfo)

module.exports = router