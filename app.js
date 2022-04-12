const express = require('express')
const app = express()

//Parse JSON
app.use(express.json())

//Import Routes
const guest = require('./routes/GuestRoute')
const room = require('./routes/RoomRoute')
const employee = require('./routes/EmployeeRoute')

//Routes
app.use("/api/Guest", guest)
app.use("/api/Room", room)
app.use("/api/Employee", employee)

//Start Server at Port 5000
app.listen(5000)