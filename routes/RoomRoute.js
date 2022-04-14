const router = require('express').Router()
const controller = require('../controllers/RoomController')

router.get("/findByGuest", controller.findByGuest)
router.get("/findInfo/:num", controller.findInfo)
router.get("/getAll", controller.getAll)

router.post("/", controller.add)

router.put("/book", controller.book)
router.put("/checkOut/:num", controller.checkOut)

router.delete("/:num", controller.remove)

module.exports = router