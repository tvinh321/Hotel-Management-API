const model = require('../model/EmployeeModel')
const view = require('../view/view')

function getEmployeeOnFloor(req, res) {
    queryKeys = Object.keys(req.query)
    if (queryKeys.length == 0) {
        view.emptyQuery(res)
    }
    else if (!queryKeys.includes("floor")) {
        view.paramRequired(res, "floor")
    }
    else {
        model.getEmployeeOnFloor(req.query, (err, result) => {
            view.result(res, err, result)
        })
    }
}

module.exports = {getEmployeeOnFloor}