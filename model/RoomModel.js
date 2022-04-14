const db = require('./database')

function findByGuest(filter, control) {
    let query = "SELECT num, floorNum FROM Room INNER JOIN Guest ON Room.guest = Guest.ID WHERE "

    if (filter.name) {
        query += `guest.fullName = "${filter.name}"`
    }
    if (filter.card) {
        if (query.charAt(query.length - 1) != " ") query += " AND "
        query += `guest.cardNumber = "${filter.card}"`
    }
    if (filter.phone) {
        if (query.charAt(query.length - 1) != " ") query += " AND "
        query += `guest.phoneNumber = "${filter.phone}"`
    }
    query += ";";

    db.query(query, (err, result) => {
        control(err, result)
    })
}

function findInfo(filter, control) {
    let query = `SELECT * FROM Room LEFT JOIN Guest ON Room.guest = Guest.ID WHERE Room.num = ${filter.num};`

    db.query(query, (err, result) => {
        control(err, result)
    })
}

function getAll(filter, control) {
    let query = "SELECT * FROM Room LEFT JOIN Guest ON Room.guest = Guest.ID"
    if (filter.floor) {
        query += ` WHERE floorNum = ${filter.floor}`
    }
    query += ";"

    db.query(query, (err, result) => {
        control(err, result)
    })
}

function add(data, control) {
    let query = `INSERT INTO Room VALUES(${data.num}, NULL, ${data.floorNum});`

    db.query(query, (err, result) => {
        control(err, result)
    })
}

function book(data, control) {
    let findRoomQuery = `SELECT guest FROM room WHERE room.num = ${data.num};`

    db.query(findRoomQuery, (err, result) => {
        if (result[0].guest != null) {
            control("Room Already Booked", err, result)
            return
        }
        else {
            let updateQuery = `UPDATE room SET room.guest = ${data.guest} WHERE room.num = ${data.num};`

            db.query(updateQuery, (err, result) => {
                control(false, err, result)
            })
        }
    })
}

function checkOut(data, control) {
    let findRoomQuery = `SELECT guest FROM room WHERE room.num = ${data.num};`

    db.query(findRoomQuery, (err, result) => {
        if (result[0].guest == null) {
            control("There Is No Guest There To Check Out", err, result)
            return
        }
        else {
            let updateQuery = `UPDATE room SET room.guest = NULL WHERE room.num = ${data.num};`

            db.query(updateQuery, (err, result) => {
                control(null, err, result)
            })
        }
    })
}

function remove(data, control) {
    let query = `DELETE FROM room WHERE room.num = ${data.num}`

    db.query(query, (err, result) => {
        control(err, result)
    })
}

module.exports = {findByGuest, findInfo, getAll, add, book, checkOut, remove}