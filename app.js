const express = require('express')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const app = express()

dotenv.config()

//Parse JSON
app.use(express.json())

//Import Routes
const guest = require('./routes/GuestRoute')
const room = require('./routes/RoomRoute')
const employee = require('./routes/EmployeeRoute')
const auth = require('./routes/AuthRoute')

//Authorization Middleware
function authorize(req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            next()
        })
    }
    else return res.sendStatus(403)
}

//Routes
app.use(auth)
app.use("/api/Guest", authorize, guest)
app.use("/api/Room", authorize, room)
app.use("/api/Employee", authorize, employee)

//Start Server at Port 5000
app.listen(5000)