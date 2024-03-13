const userDb = require("../database/user")

const checkUserExists = async (req, res, next) => {
  try {
    if (res.locals.error) {
      return res.status(400).json(res.locals.error)
    }
    const { value, field } = req.body
    const user = await userDb.getUser(field, value)
    res.locals.user = user
    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong, please try again later" })
  }
}

module.exports = { checkUserExists }