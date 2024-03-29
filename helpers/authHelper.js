require("dotenv")
const { validateEmail, validatePassword } = require("../common/validations")
const userDb = require("../database/user")
const authDb = require("../database/auth")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const otpGenerator = require("otp-generator")

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

const validateSendOtp = async (req, res, next) => {
    const {email} = req.body
    if(!email || !email.trim()) {
        return res.status(400).json({email: "Email is required"})
    } else if(validateEmail(email)) {
        return res.status(400).json({message: validateEmail(email)})
    }
    const user = await authDb.getUserByEmail(email)
    if(user) return res.status(403).json({message: "Email already exists"})
    next()
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
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY)
    return token
}

const sendMail = ({to, subject, text}) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GOOGLE_MAIL_ADDRESS,
                pass: process.env.GOOGLE_APP_PASSWORD,
            }
        })
        const mailOptions = {
            from: process.env.GOOGLE_MAIL_ADDRESS,
            to,
            subject,
            text
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                reject(error)
            }
            resolve(info.response)
        })
    })
    
}

const generateOTP = () => {
    const otp = otpGenerator.generate(6, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false})
    return otp
}

const validateVerifyOtp = (req, res, next) => {
    const {otp, email, password} = req.body
    if(!otp || !otp.trim() || otp.length !== 6) {
        return res.status(400).json({otp: "Invalid OTP"})
    } 
    if(!email || !email.trim() || validateEmail(email)) {
        return res.status(400).json({email: "Invalid email"})
    }
    if (validatePassword(password)) {
        error.password = validatePassword(password)
    }
    next()
}

module.exports = { handleUserRegistration, validateAuth, handleUserLogin, validateCheckUserExists, validateSendOtp, validateGetOtpToken, generateToken, sendMail, generateOTP, validateVerifyOtp }