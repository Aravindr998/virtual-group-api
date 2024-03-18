const express = require("express")
require("../auth/localStrategy")
const { handleRegister, handleCheckUser, handleLogin, handleSendOtp, generateOTPToken } = require("../controller/authController")
const { checkUserExists, getUserByField } = require("../middlewares/authMiddleware")
const { validateAuth, validateCheckUserExists, validateSendOtp, validateGetOtpToken } = require("../helpers/authHelper")

const router = express.Router()

router.get("/check-user-exists", validateCheckUserExists, getUserByField, handleCheckUser)

router.post("/login", validateAuth, handleLogin)

router.post("/get-otp-token", validateGetOtpToken, generateOTPToken)

router.post("/send-email-otp", validateSendOtp, handleSendOtp)

router.post("/verify-email")

router.post("/register", validateAuth, checkUserExists, handleRegister)

router.post("/login-register", validateAuth, checkUserExists)

module.exports = router