const model = require('../model/RoomModel')
const view = require('../view')

function findRoomByGuest(req, res) {
    queryKeys = Object.keys(req.query)
    if (queryKeys.length == 0) {
        view.emptyQuery(res)
    }
    else {
        model.findRoomByGuest(req.query, (err, result) => {
            view.result(res, err, result)
        })
    }
}

function findRoomInfo(req, res) {
    queryKeys = Object.keys(req.query)
    if (queryKeys.length == 0) {
        view.emptyQuery(res)
    }
    else {
        model.findRoomInfo(req.query, (err, result) => {
            view.result(res, err, result)
        })
    }
}

module.exports = {findRoomByGuest, findRoomInfo}