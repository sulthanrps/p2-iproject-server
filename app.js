if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const router = require('./Routes')

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(router)

app.use((err, req, res, next) => {
    let code = 500
    let message = "Internal server error"

    if(err.name == "email_req"){
        code = 401
        message = "Email is required"
    }

    else if(err.name == "password_req"){
        code = 401
        message = "Password is required"
    }

    else if(err.name == "invalid_email/password"){
        code = 401
        message = "Invalid email / password"
    }

    res.status(code).json({message})
})

app.listen(port, () => {
    console.log("Listening on port " + port)
})