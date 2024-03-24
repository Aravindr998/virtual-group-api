const otpSchema = {
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    otp: {
        type: String,
        required: [true, "OTP is required"]
    },
    createdAt: {
        type: Date,
        default: new Date(),
        expires: 300,
        required: [true, "Current date is required"]
    }
}

module.exports = otpSchema