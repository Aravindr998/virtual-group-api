const authSchema = {
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Invalid email',
        ],
    },
    password: {
        type: String,
        required: function () {
            return !this.oauthId
        }
    },
    oauthId: {
        type: String,
        sparse: true,
        unique: true,
    },
}

module.exports = authSchema