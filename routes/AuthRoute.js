const express = require('express')
const controller = require('../controllers/AuthController')
const route = express.Router()

route.post("/login", controller.login)
route.post("/token", controller.token)
route.post("/logout", controller.logout)

module.exports = route