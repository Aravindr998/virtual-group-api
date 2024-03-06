const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[a-zA-Z]).{6,}$/

const validateEmail = (email) => {
    if (!email) return "Email cannot be empty"
    else if (!emailRegex.test(email)) {
        return "Invalid email"
    }
}


const validatePassword = (password) => {
    if (!password) return "Password cannot be empty"
    else if (!passwordRegex.test(password)) return "Invalid password"
}

module.exports = {
    validateEmail, validatePassword
}