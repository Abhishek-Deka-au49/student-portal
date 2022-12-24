const mongoose = require("mongoose");
const { Schema } =  require("mongoose");

const signupSchema = new Schema({
   name:{
      type:String,
      required:true
   },
   email:{
      type:String,
      unique:true,
      required:true
   },
   password:{
      type:String,
      required:true
   }
   
})

const signupModel = mongoose.model('users',signupSchema);
module.exports = signupModel;
