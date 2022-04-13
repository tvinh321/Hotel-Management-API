const model = require('../model/GuestModel')
const view = require('../view/view')

function getAllGuests(req, res) {
    model.getAllGuests((err, result) => {
        view.getResult(res, err, result)
    })
}

function findGuest(req, res) {
    queryKeys = Object.keys(req.query)
    if (queryKeys.length == 0) {
        view.emptyQuery(res)
    }
    else {
        model.findGuest(req.query, (err, result) => {
            view.getResult(res, err, result)
        })
    }
}

function addGuest(req, res) {
    body = req.body
    if (!body.name || !body.card || !body.phone || !body.address) {
        view.postWrongFormat(res, ["name", "address", "card", "phone"])
    }
    else {
        model.addGuest(req.body, (err, result) => {
            view.postResult(res, err, result)
        })
    }
}

module.exports = {getAllGuests, findGuest, addGuest}