const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: 'student_portal' },{ useNewUrlParser:true })
    console.log("Connected to DB Successfully")
  } catch (err) {
    console.log("Error Connecting to DB")
    process.exit()
  }
}
module.exports = {
   connectDB
}