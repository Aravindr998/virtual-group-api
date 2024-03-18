const passport = require("passport")
const userDb = require("../database/user")
const authDb = require("../database/auth")
const { generateToken } = require("../helpers/authHelper")

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
    return res.json(user)
}

const handleSendOtp = async(req, res, next) => {
    
}

const generateOTPToken = async(req, res)  => {
    const {email} = req.body
    const token = generateToken({email, type: "OTP"})
    return res.json({token})
}

module.exports = { handleRegister, handleCheckUser, handleLogin, handleSendOtp, generateOTPToken }