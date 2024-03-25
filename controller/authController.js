const passport = require("passport")
const userDb = require("../database/user")
const authDb = require("../database/auth")
const { generateToken, sendMail, generateOTP } = require("../helpers/authHelper")

const handleCheckUser = (req, res) => {
    if(!res.locals.user) return res.json({userExists: false})
    return res.json({userExists: true})
}

const registerUser = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate("signup", { session: false }, async (err, user) => {
            try {
                if (err) {
                    throw err
                }
                resolve(user)
            } catch (error) {
                console.log(error)
                reject()
            }
        })(req, res, next)
    })
}

const loginUser = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate("login", {session: false}, async (err, user, message) => {
            try {
                if(err) throw err
                if(!user) return res.status(401).json(message)
                resolve(user)
            }catch(error) {
                reject(error)
            }
        })(req, res, next)
    })
}



const handleRegister = async (req, res, next) => {
    try {
        const { password } = req.body
        let userAuth
        if (!res.locals.user) {
            userAuth = await registerUser(req, res, next)
        } else {
            userAuth = res.locals.user
        }
        const user = await loginUser(req, res, next)

    } catch (error) {
        console.log(error)
        return res.json({ message: "Something went wrong, Please try again later" })
    }

}

const handleLogin = async (req, res, next) => {
    if(res.locals.error) {
        return res.status(400).json(res.locals.error)
    }
    const user = await loginUser(req, res, next)
    const token = generateToken({email: user.email, type: "Auth"})
    return res.json({token: token})
}

const handleSendOtp = async(req, res) => {
    try {
        const {email} = req.body
        const otp = generateOTP()
        const subject = "Email account verification"
        const text = `Your OTP for email verification is ${otp}`
        await authDb.saveOtpInfo({email, otp})
        await sendMail({to: email, subject, text})
        res.json({success: true, message: "OTP has been sent to your email"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong, please try again later"})
    }

}

const generateOTPToken = async(req, res)  => {
    try {
        const {email} = req.body
        const token = generateToken({email, type: "OTP"})
        return res.json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong, please try again later"})
    }
}

const verifyOtp = async(req, res) => {
    try {
        const isVerified = await authDb.verifyEmailOtp(req.body)
        if(!isVerified) {
            return res.status(400).json({message: "Incorrect otp"})
        } 
        const {email, password} = req.body
        const user = await authDb.saveUser({ email, password })
        const token =  generateToken({email: user.email, type: "Auth"})
        return res.json({success: true, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong, please try again later"})
    }
}

module.exports = { handleRegister, handleCheckUser, handleLogin, handleSendOtp, generateOTPToken, verifyOtp }