const model = require('../model/GuestModel')
const view = require('../view/view')

function getAllGuests(req, res) {
    model.getAllGuests((err, result) => {
        view.result(res, err, result)
    })
}

function findGuest(req, res) {
    queryKeys = Object.keys(req.query)
    if (queryKeys.length == 0) {
        view.emptyQuery(res)
    }
    else {
        model.findGuest(req.query, (err, result) => {
            view.result(res, err, result)
        })
    }
}

module.exports = {getAllGuests, findGuest}