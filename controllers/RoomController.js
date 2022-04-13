const model = require('../model/RoomModel')
const view = require('../view/view')

function findRoomByGuest(req, res) {
    queryKeys = Object.keys(req.query)
    if (queryKeys.length == 0) {
        view.emptyQuery(res)
    }
    else {
        model.findRoomByGuest(req.query, (err, result) => {
            view.getResult(res, err, result)
        })
    }
}

function findRoomInfo(req, res) {
    model.findRoomInfo(req.params, (err, result) => {
        view.getResult(res, err, result)
    })
}

function getAllRoom(req, res) {
    model.getAllRoom(req.query, (err, result) => {
        view.getResult(res, err, result)
    })
}

function addRoom(req, res) {
    body = req.body
    if (!body.num || !body.floorNum) {
        view.postWrongFormat(res, ["num", "floorNum"])
    }
    else {
        model.addRoom(req.body, (err, result) => {
            view.postResult(res, err, result)
        })
    }
}

module.exports = {findRoomByGuest, findRoomInfo, getAllRoom, addRoom}