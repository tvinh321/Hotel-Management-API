const db = require('./database')

function getAll(control) {
    let query = "SELECT * FROM guest"

    db.query(query, (err, res) => {
        control(err, res)
    })
}

function find(filter, control) {
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

function add(data, control) {
    let query = `INSERT INTO Guest VALUES(NULL, "${data.name}", "${data.card}", "${data.address}", "${data.phone}");`

    db.query(query, (err, result) => {
        control(err, result)
    })
}

module.exports = {getAll, find, add}