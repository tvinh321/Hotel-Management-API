const db = require('./database')

function getUser(username, control) {
    db.query(`SELECT * FROM Users WHERE user = "${username}";`, (err, result) => {
        control(err, result)
    })
}

function getRefreshToken(token, control) {
    db.query(`SELECT * FROM RefreshTokens WHERE token = "${token}"`, (err, result) => {
        control(err, result)
    })
}

function addRefreshToken(token, control) {
    db.query(`INSERT INTO RefreshTokens VALUES ("${token}")`, (err, result) => {
        control(err, result)
    })
}

function deleteRefreshToken(token, control) {
    db.query(`DELETE FROM RefreshTokens WHERE token = "${token}"`, (err, result) => {
        control(err, result)
    })
}

module.exports = { getUser, getRefreshToken, addRefreshToken, deleteRefreshToken }