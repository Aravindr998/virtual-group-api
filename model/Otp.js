const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const otp = require("../schema/otpSchema")

const otpSchema = new mongoose.Schema(otp)

otpSchema.pre("findOneAndUpdate", async function (next) {
    const hash = await bcrypt.hash(this._update.$set.otp, 10)
    this._update.$set.otp = hash
    next()
})

otpSchema.methods.verifyOtp = async function (otp) {
    const compare = await bcrypt.compare(otp, this.otp)
    return compare
}

const Otp = mongoose.model("Otp", otpSchema)

module.exports = Otp