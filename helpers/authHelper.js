require("dotenv")
const { validateEmail, validatePassword } = require("../common/validations")
const userDb = require("../database/user")
const authDb = require("../database/auth")
const jwt = require("jsonwebtoken")

const validateCheckUserExists = (req, res, next) => {
    const {value, field} = req.query
    if(!field || !field.trim()) return res.status(400).json({message: "Field is required"})
    if(!value || !value.trim()) return res.status(400).json({field: `${field} is required`})
    next()
}

const validateAuth = (req, res, next) => {
    const { email, password } = req.body
    const error = {}
    if (validateEmail(email)) {
        error.email = validateEmail(email)
    }
    if (validatePassword(password)) {
        error.password = validatePassword(password)
    }
    if (Object.keys(error).length) res.locals.error = error
    next()
}

const validateSendOtp = (req, res, next) => {
    const {email, token} = req.body
}

const validateGetOtpToken = async (req, res, next) => {
    const {email} = req.body
    if(!email || !email.trim()) {
        return res.status(400).json({email: "Email is required"})
    } else if(validateEmail(email)) {
        return res.status(400).json({message: validateEmail(email)})
    }

    const user = await authDb.getUserByEmail(email)
    if(user) return res.status(400).json({message: "User already exists"})

    next()
}

const handleUserRegistration = async (req, email, password, done) => {
    try {
        const user = await authDb.saveUser(req.body)
        return done(null, user)
    } catch (error) {
        console.log(error)
        return done(error)
    }

}

const handleUserLogin = async (email, password, done) => {
    try {
        const user = await authDb.getUserByEmail(email)
        const validate = await authDb.isCorrectPassword(user, password)
        if (!validate) {
            return done(null, false, { password: "Incorrect password" })
        }
        return done(null, user)
    } catch (error) {
        return done(error)
    }
}

const generateToken = (data) => {
    console.log(process.env.JWT_SECRET_KEY)
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY)
    return token
}

module.exports = { handleUserRegistration, validateAuth, handleUserLogin, validateCheckUserExists, validateSendOtp, validateGetOtpToken, generateToken }