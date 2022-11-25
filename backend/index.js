const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require("cors")
const PORT = 8080

//this allows us to access JSON data sent from frontend to the backend
app.use(bodyParser.json())

//this allows the frontend to talk to the backend
app.use(cors())

app.get("/", (request, response) => {
    console.log("pinged: ", request.url, " the path is: ", request.path)
    console.log("params if any: ", request.params)
    response.status(200).json({
        message: "Backend working! Message to front end being sent!"
    })
})

app.post("/sendData", (request, response) => {
    console.log("Data should be in ", request.body)
    //accessing data example
    let dataHolder = request.body

    //manipulating data example (if necessary)
    dataHolder["received"] = true
    dataHolder["message"] = "Data received and manipulated and sent back."
    dataHolder["favFoods"].push("Thai Green Curry")

    //sending data back to frontend example
    response.status(200).json(dataHolder)
})


app.listen(PORT, () => {
    console.log(`Server started. Listening on http://localhost:${PORT}`)
})