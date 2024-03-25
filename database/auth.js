const userModel = require("../model/User")
const authModel = require("../model/Auth")
const otpModel = require("../model/Otp")
const { email } = require("../schema/authSchema")

const saveUser = async ({ email, password, oauthId, emailValidated = false }) => {
    const user = new authModel({
        email,
        password,
        oauthId,
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

const saveOtpInfo = async({email, otp}) => {
    const otpDoc = await otpModel.findOneAndUpdate({email: email}, {"$set": {email: email, otp: otp, date: new Date()}}, {upsert: true})
    return otpDoc
}

const verifyEmailOtp = async({email, otp}) => {
    const otpDoc = await otpModel.findOne({email})
    if(!otpDoc) return false
    const isCorrect = await otpDoc.verifyOtp(otp)
    return isCorrect
}

module.exports = { saveUser, getUserByEmail, isCorrectPassword, saveOtpInfo, verifyEmailOtp }