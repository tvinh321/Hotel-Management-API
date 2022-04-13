const model = require('../model/EmployeeModel')
const view = require('../view/view')

function getEmployeeOnFloor(req, res) {
    queryKeys = Object.keys(req.query)
    if (queryKeys.length == 0) {
        view.emptyQuery(res)
    }
    else if (!queryKeys.includes("floor")) {
        view.queryRequired(res, "floor")
    }
    else {
        model.getEmployeeOnFloor(req.query, (err, result) => {
            view.getResult(res, err, result)
        })
    }
}

function addEmployee(req, res) {
    body = req.body
    if (!body.name || !body.card || !body.phone || !body.address || !body.position || !body.floor) {
        view.postWrongFormat(res, ["name", "address", "card", "phone", "position", "floor"])
    }
    else {
        model.addEmployee(req.body, (err, result) => {
            view.postResult(res, err, result)
        })
    }
}

module.exports = {getEmployeeOnFloor, addEmployee}