const db = require('./database')

function getEmployeeOnFloor(filter, control) {
    let query = `SELECT ID, fullName, cardNumber, address, phoneNumber, position FROM Employee INNER JOIN RoomFloor ON Employee.floorManages = RoomFloor.num WHERE Employee.floorManages = ${filter.floor}`

    if (filter.position) {
        query += ` AND Employee.position = "${filter.position}"`
    }

    query += ";"

    db.query(query, (err, result) => {
        control(err, result)
    })
}

function addGuest(data, control) {
    let query = `INSERT INTO Employee VALUES(NULL, "${data.name}", "${data.card}", "${data.address}", "${data.phone}", "${data.position}", ${data.floor});`

    db.query(query, (err, result) => {
        control(err, result)
    })
}

module.exports = {getEmployeeOnFloor, addGuest}