const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const auth = require("../schema/authSchema")
const userSchema = require("../schema/userSchema")

const authSchema = new mongoose.Schema(
    auth, { timestamps: true }
)

authSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

authSchema.methods.matchPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password)
    return compare
}

const Auth = mongoose.model("Auth", authSchema)

module.exports = Auth