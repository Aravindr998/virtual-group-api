const userModel = require("../model/User")
const authModel = require("../model/Auth")

const saveUser = async ({ email, password, oauthId, emailValidated = false }) => {
    const user = new authModel({
        email,
        password,
        oauthId,
        emailValidated,
    })
    await user.save()
    return user
}

const getUserByEmail = async (email) => {
    const user = await authModel.findOne({ email })
    return user
}

const isCorrectPassword = async (user, password) => {
    return user.matchPassword(password)
}

module.exports = { saveUser, getUserByEmail, isCorrectPassword }