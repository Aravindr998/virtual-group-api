const { default: mongoose } = require("mongoose")
const userModel = require("../model/User")
const authModel = require("../model/Auth")

const saveUser = async ({ firstName, lastName, username, email, phone, password, oauthId, emailValidated = false, phoneValidated = false }) => {
    const user = new userModel({
        firstName,
        lastName,
        username,
        email,
        phone,
        password,
        oauthId,
        emailValidated,
        phoneValidated
    })
    await user.save()
    return user
}

const getUserByEmail = async (email) => {
    const user = await authModel.findOne({ email })
    return user
}

module.exports = { saveUser, getUserByEmail }