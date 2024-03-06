const passport = require("passport")
const userDb = require("../database/user")
const authDb = require("../database/auth")

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



const handleAuth = async (req, res, next) => {
    try {
        const { password } = req.body
        let user
        if (!res.locals.user) {
            user = await registerUser(req, res, next)
        } else {
            user = res.locals.user
        }

    } catch (error) {
        console.log(error)
        return res.json({ message: "Something went wrong, Please try again later" })
    }

}

module.exports = { handleAuth }