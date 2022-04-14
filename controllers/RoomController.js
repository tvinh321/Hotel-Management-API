const model = require('../model/RoomModel')
const view = require('../view/view')

function findByGuest(req, res) {
    queryKeys = Object.keys(req.query)
    if (queryKeys.length == 0) {
        view.emptyQuery(res)
    }
    else {
        model.findByGuest(req.query, (err, result) => {
            view.getResult(res, err, result)
        })
    }
}

function findInfo(req, res) {
    model.findInfo(req.params, (err, result) => {
        view.getResult(res, err, result)
    })
}

function getAll(req, res) {
    model.getAll(req.query, (err, result) => {
        view.getResult(res, err, result)
    })
}

function add(req, res) {
    body = req.body
    if (!body.num || !body.floorNum) {
        view.postputWrongFormat(res, ["num", "floorNum"])
    }
    else {
        model.add(req.body, (err, result) => {
            view.postResult(res, err, result)
        })
    }
}

function book(req, res) {
    body = req.body
    if (!body.num || !body.guest) {
        view.postputWrongFormat(res, ["num", "guest"])
    }
    else {
        model.book(req.body, (message, err, result) => {
            if (message) {
                view.customClientError(res, message)
            }
            else {
                view.putResult(res, err, result)
            }
        })
    }
}

function checkOut(req, res) {
    model.checkOut(req.params, (message, err, result) => {
        if (message) {
            view.customClientError(res, message)
        }
        else {
            view.putResult(res, err, result)
        }
    })
}

function remove(req, res) {
    model.remove(req.params, (err, result) => {
        view.deleteResponse(res, err, result)
    })
}

module.exports = {findByGuest, findInfo, getAll, add, book, checkOut, remove}