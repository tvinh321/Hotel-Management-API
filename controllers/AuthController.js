const model = require('../model/AuthModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../model/database')

function genToken(json, refresh) {
    if (refresh) return jwt.sign(json, process.env.REFRESH_TOKEN_SECRET)
    else return jwt.sign(json, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" })
}

function login(req, res) {
    const username = req.body.username
    const password = req.body.password

    model.getUser(username, async (err, result) => {
        if (err) return res.sendStatus(500)

        try {
            if (await bcrypt.compare(password, result[0].pass)) {
                const accessToken = genToken({"username": username}, false)
                const refreshToken = genToken({"username": username}, true)

                model.addRefreshToken(refreshToken, (err, result) => {
                    if (err) return res.send(err)
                })
    
                return res.status(201).json({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                })
            }
            else return res.send("Wrong Username or Password")
        }
        catch (err) {
            return res.sendStatus(500)
        }
    })
}

function token(req, res) {
    const token = req.body.token

    model.getRefreshToken(token, (err, result) => {
        if (err) return res.sendStatus(500)
        if (result.length == 0) return res.sendStatus(403)
        
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            return res.json({
                accessToken: genToken({ username: user.username }, false)
            })
        })
    })
}

function logout(req, res) {
    const token = req.body.token

    model.deleteRefreshToken(token, (err, result) => {
        if (err) return res.sendStatus(500)
        return res.sendStatus(200)
    })
}

module.exports = { login, token, logout }