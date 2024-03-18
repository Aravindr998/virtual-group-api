const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { handleUserRegistration, handleUserLogin } = require("../helpers/authHelper")
const { ExtractJwt } = require("passport-jwt")
const JWTStrategy = require("passport-jwt").Strategy

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

passport.use(
    new JWTStrategy({
        secretOrKey: process.env.JWT_SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
        async (token, done) => {
            try {
                return done(null, token)
            } catch (error) {
                done(error)
            }
        }
    )
)