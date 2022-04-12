const db = require('./database')

function getAllGuests(control) {
    let query = "SELECT * FROM guest"

    db.query(query, (err, res) => {
        control(err, res)
    })
}

function findGuest(filter, controller) {
    let query = "SELECT * FROM guest WHERE "

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

    db.query(query, (err, res) => {
        control(err, res)
    })
}

module.exports = {getAllGuests, findGuest}