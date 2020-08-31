const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

const app = express()
const port = 3000


app.use(bodyParser.urlencoded({extended: false}))

app.get("/", (req, res) => {
  res.send("hello world")
})

app.listen(port, () => {
  console.log("Server running on localhost:" + port)
})
