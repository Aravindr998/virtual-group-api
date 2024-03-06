require("dotenv").config()
const express = require("express")
const cors = require("cors")
const db = require("./config/db.config")
const authRouter = require("./router/authRouter")

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.static("./public"))
app.use(cors())

db().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Listening at http://localhost:${PORT} 🔥`)
    })
}).catch(error => {
    console.log("Couldn't Start Server 🥲")
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/auth", authRouter)
