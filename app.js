const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const mailChimp = require("@mailchimp/mailchimp_marketing")

const app = express()
const port = 3000

mailChimp.setConfig({
  apiKey: "c08472b498e24018ae7b05fdecf1af4b-us17",
  server: "us17"
})

async function callPing() {
  const response = await mailChimp.ping.get()
  console.log(response)
}

app.use(bodyParser.urlencoded({extended: true}))

callPing()

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
  const firstName = req.body.fname
  const lastName = req.body.lname
  const email = req.body.email
  const listId = "80b1739d81";
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }

  function run() {
    mailChimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    })

    .then((response) => {
      res.sendFile(__dirname + "/sucess.html")
    }).catch((err) => { res.sendFile(__dirname + "/failure.html")})
  }
  run()

})

app.post("/failure", (req, res) => {
  res.redirect("/")
})

app.listen(port, () => {
  console.log("Server running on localhost:" + port)
})
