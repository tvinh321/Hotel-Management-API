const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pltv123",
    port: "3306",
    database: "hotelmanagement"
})

db.connect((err) => {
    if (err) {
        if (err.code == "ECONNREFUSED") console.log("Database Error: Connection Refused")
        else console.error(err)
    }
    else {
        console.log("Database Connected Successfully")
    }
})

module.exports = db