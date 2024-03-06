const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const user = require("../schema/userSchema")

const userSchema = new mongoose.Schema(
    user, { timestamps: true }
)

const Users = mongoose.model("Users", userSchema)

module.exports = Users