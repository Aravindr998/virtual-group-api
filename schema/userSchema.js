const userSchema = {
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [2, "First name is invalid"],

    },
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Username is required"],
        minLength: [3, "Minimum 3 characters required"]
    },
    phone: {
        type: String,
        unique: [true, "Phone number is linked to another account"]
    },
    phoneValidated: {
        type: Boolean,
        default: false
    },
}

module.exports = userSchema