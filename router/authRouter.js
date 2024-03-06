const express = require("express")
require("../auth/localStrategy")
const { handleAuth } = require("../controller/authController")
const { checkUserExists } = require("../middlewares/authMiddleware")
const { validateAuth } = require("../helpers/authHelper")

const router = express.Router()

router.post("/login-register", validateAuth, checkUserExists, handleAuth)

module.exports = router