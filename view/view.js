function emptyQuery(res) {
    res.status(400).send({
        message: "No Query found. Please enter at least 1 query"
    })
}

function paramRequired(res, param) {
    res.status(400).send({
        message: `Query param '${param}' is required`
    })
}

function result(res, err, result) {
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

module.exports = {result, emptyQuery, paramRequired}