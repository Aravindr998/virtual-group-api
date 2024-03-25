const express = require("express")
require("../auth/localStrategy")
const { handleRegister, handleCheckUser, handleLogin, handleSendOtp, generateOTPToken, verifyOtp } = require("../controller/authController")
const { checkUserExists, getUserByField, isUserLoggedin, authenticateOtpRequest } = require("../middlewares/authMiddleware")
const { validateAuth, validateCheckUserExists, validateSendOtp, validateGetOtpToken, validateVerifyOtp } = require("../helpers/authHelper")

const router = express.Router()

router.get("/check-user-exists", validateCheckUserExists, getUserByField, handleCheckUser)

router.post("/login", validateAuth, handleLogin)

router.post("/get-otp-token", validateGetOtpToken, generateOTPToken)

router.post("/send-email-otp",  authenticateOtpRequest, validateSendOtp, handleSendOtp)

router.post("/verify-email-otp", validateVerifyOtp, verifyOtp)

router.post("/register", validateAuth, checkUserExists, handleRegister)

router.post("/login-register", validateAuth, checkUserExists)

module.exports = router