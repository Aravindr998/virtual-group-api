const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { handleUserRegistration, handleUserLogin } = require("../helpers/authHelper")

passport.use(
    "signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        handleUserRegistration
    )
)

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        handleUserLogin
    )
)