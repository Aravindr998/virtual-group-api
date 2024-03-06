const mongoose = require("mongoose")


async function connectDb() {
    return new Promise(async (resolve, reject) => {
        try {
            await mongoose.connect(process.env.MONGO_URL)
            console.log("Connected to DB 🍀")
            resolve()
        } catch (error) {
            console.log(`Couldn't connect to database: ${error} 🔴`)
            reject()
        }
    })
}

module.exports = connectDb
