const model = require('../model/GuestModel')
const view = require('../view/view')

function getAll(req, res) {
    model.getAll((err, result) => {
        view.getResult(res, err, result)
    })
}

function find(req, res) {
    queryKeys = Object.keys(req.query)
    if (queryKeys.length == 0) {
        view.emptyQuery(res)
    }
    else {
        model.find(req.query, (err, result) => {
            view.getResult(res, err, result)
        })
    }
}

function add(req, res) {
    body = req.body
    if (!body.id || !body.card || !body.phone || !body.address) {
        view.postputWrongFormat(res, ["name", "address", "card", "phone"])
    }
    else {
        model.add(req.body, (err, result) => {
            view.postResult(res, err, result)
        })
    }
}

module.exports = {getAll, find, add}