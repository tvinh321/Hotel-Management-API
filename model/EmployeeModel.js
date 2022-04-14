const db = require('./database')

function getByFloor(filter, control) {
    let query = `SELECT ID, fullName, cardNumber, address, phoneNumber, position FROM Employee INNER JOIN RoomFloor ON Employee.floorManages = RoomFloor.num WHERE Employee.floorManages = ${filter.floor}`

    if (filter.position) {
        query += ` AND Employee.position = "${filter.position}"`
    }

    query += ";"

    db.query(query, (err, result) => {
        control(err, result)
    })
}

function add(data, control) {
    let query = `INSERT INTO Employee VALUES(NULL, "${data.name}", "${data.card}", "${data.address}", "${data.phone}", "${data.position}", ${data.floor});`

    db.query(query, (err, result) => {
        control(err, result)
    })
}

function changePosition(data, control) {
    let findEmployeeQuery = `SELECT ID FROM employee WHERE employee.ID = ${data.id};`

    db.query(findEmployeeQuery, (err, result) => {
        if (result.length == 0) {
            control("Employee Doesn't Exist", err, result)
            return
        }
        else {
            let updateQuery = `UPDATE employee SET employee.position = "${data.position}" WHERE employee.id = ${data.id};`

            db.query(updateQuery, (err, result) => {
                control(null, err, result)
            })
        }
    })
}

function changeFloor(data, control) {
    let findEmployeeQuery = `SELECT ID FROM employee WHERE employee.ID = ${data.id};`

    db.query(findEmployeeQuery, (err, result) => {
        if (result.length == 0) {
            control("Employee Doesn't Exist", err, result)
            return
        }
        else {
            let updateQuery = `UPDATE employee SET employee.floorManages = "${data.floor}" WHERE employee.id = ${data.id};`

            db.query(updateQuery, (err, result) => {
                control(null, err, result)
            })
        }
    })
}

function remove(data, control) {
    let query = `DELETE FROM employee WHERE employee.ID = ${data.id}`

    db.query(query, (err, result) => {
        control(err, result)
    })
}

module.exports = {getByFloor, add, changePosition, changeFloor, remove}