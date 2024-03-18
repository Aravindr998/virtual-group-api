const userDb = require("../database/user")
const authDb = require("../database/auth")
const passport = require("passport")

const getUserByField = async (req, res, next) => {
  try {
    if (res.locals.error) {
      return res.status(400).json(res.locals.error)
    }
    const { value, field } = req.query
    const user = await userDb.getUser(field, value)
    res.locals.user = user
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong, please try again later" })
  }
}

const checkUserExists = async(req, res, next) => {
  try {
    if (res.locals.error) {
      return res.status(400).json(res.locals.error)
    }
    const {email} = req.body
    const user = await authDb.getUserByEmail(email)
    res.locals.user = user
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong, please try again later" })
  }
}

const isUserLoggedin = async (req, res, next) => {
  passport.authenticate("jwt", {session: false}, async(err, token) => {
    try {
      if(!token || token.type !== "auth" || err) throw new Error("Invalid authentication token")
      req.email = token.email
      next()
    } catch (error) {
      console.log(error)
      return res.status(401).json({message: "Invalid authentication token"})
    }

  })(req, res, next)
}

const authenticateOtpRequest = async (req, res, next) => {
  passport.authenticate("jwt", {session: false}, async (err, token) => {
    try {
      if(!token || err) throw new Error("Invalid authentication token")
      req.email = token.email
      next()
    } catch (error) {
      console.log(error)
      return res.status(401).json({message: "Invalid request"})
    }
  })(req, res, next)
}

module.exports = { checkUserExists, getUserByField, isUserLoggedin, authenticateOtpRequest }