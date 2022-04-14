// Empty Query Response
function emptyQuery(res) {
    res.status(400).send({
        message: "No Query found. Please enter at least 1 query"
    })
}

//Specific Query Required Response
function queryRequired(res, query) {
    res.status(400).send({
        message: `Query '${query}' is required`
    })
}

//GET Result Response
function getResult(res, err, result) {
    if (err) {
        res.status(500).send({
            message: "Can't Retrieve the Information"
        })
        console.log(err)
    }
    else if (result.length == 0) {
        res.status(404).send({
            message: "404 Not Found"
        })
    }
    else {
        res.json(result)
    }
}

//POST, PUT Wrong JSON Format Response
function postputWrongFormat(res, arrJSON) {
    let message = "Wrong Format. Please send a JSON containing"
    for (let i in arrJSON) {
        message += ` '${arrJSON[i]}',`
    }
    message = message.slice(0, -1)

    res.status(400).send({
        message: message
    })
}

//POST Result Response
function postResult(res, err, result) {
    if (err) {
        if (err.code == "ER_DUP_ENTRY") {
            res.status(409).send({
                message: "Already Exists"
            })
        }
        else if (err.code == "ER_NO_REFERENCED_ROW_2") {
            res.status(409).send({
                message: "Foreign Key Constraint"
            })
        }
        else {
            res.status(500).send({
                message: "Can't Create New Item"
            })
            console.log(err)
        }
    } 
    else {
        res.status(201).send()
    }
}

//PUT Result Response
function putResult(res, err, result) {
    if (err) {
        if (err.code == 'ER_NO_REFERENCED_ROW_2') {
            res.status(409).send({
                message: "Foreign Key Constraint"
            })
        }
        else {
            res.status(500).send({
                message: "Can't Change The Values"
            })
            console.log(err)
        }
    }
    else if (result.affectedRows == 0) {
        res.status(404).send({
            message: "404 Not Found"
        })
    }
    else if (result.changedRows == 0) {
        res.status(202).send({
            message: "Nothing Changed"
        })
    }
    else {
        res.status(201).send()
        console.log(result)
    }
}

//Custom Client Error
function customClientError(res, message) {
    res.status(400).send({
        message: message
    })
}

//DELETE Result Response
function deleteResponse(res, err, result) {
    if (err) {
        res.status(500).send({
            message: "Can't Delete The Values"
        })
        console.log(err)
    }
    else if (result.affectedRows == 0) {
        res.status(400).send({
            message: "No such values exist"
        })
    }
    else {
        res.status(200).send()
    }
}

module.exports = {getResult, emptyQuery, queryRequired, postResult, postputWrongFormat, putResult, customClientError, deleteResponse}