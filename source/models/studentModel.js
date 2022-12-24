const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const studentSchema = new Schema({
   name:String,
   rollNumber:String,
   standard:String,
   section:String,
   photoUrl:String,
   cloudinary_id:String,
   address:{
      line1:String,
      line2:String,
      city:String,
      state:String
   },
   parents:[{
      name:String,
      phoneNumber:String,
      email:String,
      occupation:String,
      designation:String
   }]
})

const studentModel = mongoose.model('students',studentSchema)

module.exports = studentModel