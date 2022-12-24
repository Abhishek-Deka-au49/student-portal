const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
mongoose.set('strictQuery', false);
const {connectDB} = require('./dbconfig')
connectDB()

//middleware
app.use(express.json())
//routes
app.use("/student", require("./source/routes/student"))
//template engine
app.set("view engine", "hbs");
app.set("views", "views");

const PORT = process.env.PORT || 8080
app.listen(PORT , ()=>{
   console.log("server has started");
})
