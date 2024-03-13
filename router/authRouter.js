const express = require("express")
require("../auth/localStrategy")
const { handleRegister, handleCheckUser } = require("../controller/authController")
const { checkUserExists } = require("../middlewares/authMiddleware")
const { validateAuth, validateCheckUserExists } = require("../helpers/authHelper")

const router = express.Router()

router.post("/check-user-exists", validateCheckUserExists, checkUserExists, handleCheckUser)

router.post("/verify-email")

router.post("/register", validateAuth, checkUserExists, handleRegister)

module.exports = router