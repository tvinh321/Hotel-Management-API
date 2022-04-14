const model = require('../model/EmployeeModel')
const view = require('../view/view')

function getByFloor(req, res) {
    queryKeys = Object.keys(req.query)
    if (queryKeys.length == 0) {
        view.emptyQuery(res)
    }
    else if (!queryKeys.includes("floor")) {
        view.queryRequired(res, "floor")
    }
    else {
        model.getByFloor(req.query, (err, result) => {
            view.getResult(res, err, result)
        })
    }
}

function add(req, res) {
    body = req.body
    if (!body.name || !body.card || !body.phone || !body.address || !body.position || !body.floor) {
        view.postputWrongFormat(res, ["name", "address", "card", "phone", "position", "floor"])
    }
    else {
        model.add(req.body, (err, result) => {
            view.postResult(res, err, result)
        })
    }
}

function changePosition(req, res) {
    body = req.body
    if (!body.id || !body.position) {
        view.postputWrongFormat(res, ["id", "position"])
    }
    else {
        model.changePosition(req.body, (message, err, result) => {
            if (message) {
                view.customClientError(res, message)
            }
            else {
                view.putResult(res, err, result)
            }
        })
    }
}

function changeFloor(req, res) {
    body = req.body
    if (!body.id || !body.floor) {
        view.postputWrongFormat(res, ["id", "floor"])
    }
    else {
        model.changeFloor(req.body, (message, err, result) => {
            if (message) {
                view.customClientError(res, message)
            }
            else {
                view.putResult(res, err, result)
            }
        })
    }
}

function remove(req, res) {
    model.remove(req.params, (err, result) => {
        view.deleteResponse(res, err, result)
    })
}

module.exports = {getByFloor, add, changePosition, changeFloor, remove}