const express = require("express")
require("../auth/localStrategy")
const { handleRegister, handleCheckUser, handleLogin } = require("../controller/authController")
const { checkUserExists, getUserByField } = require("../middlewares/authMiddleware")
const { validateAuth, validateCheckUserExists } = require("../helpers/authHelper")

const router = express.Router()

router.get("/check-user-exists", validateCheckUserExists, getUserByField, handleCheckUser)

router.post("/login", validateAuth, handleLogin)

router.post("/verify-email")

router.post("/register", validateAuth, checkUserExists, handleRegister)

router.post("/login-register", validateAuth, checkUserExists)

module.exports = router