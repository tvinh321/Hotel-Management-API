const db = require('./database')

function findRoomByGuest(filter, control) {
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

function findRoomInfo(filter, control) {
    let query = `SELECT * FROM Room LEFT JOIN Guest ON Room.guest = Guest.ID WHERE Room.num = ${filter.num};`

    db.query(query, (err, result) => {
        control(err, result)
    })
}

module.exports = {findRoomByGuest, findRoomInfo}