const express = require("express");

const router = express.Router();
const signupModel = require("../models/signupModel");
const bcrypt = require("bcrypt");



 

router.get("/",(req,res)=>{
   res.render("index")
})
router.get("/login",(req,res)=>{
   res.render("login")
})
router.get("/register",(req,res)=>{
   res.render("register")
})
router.post("/register",async (req,res)=>{
   try {
      const { 
         name,
         email,
         password,
         cpassword 
      } = req.body; 
   if(password === cpassword){
      const password = await bcrypt.hash(req.body.password,10)
      const userData = new signupModel({
         name,
         email,
         password,
      })
      userData.save(err=>{
         if (err) {
            console.log("Error");
         } else {
            res.redirect("/login")
         }
      })
   } else{
      res.render("register")
   }


   } catch (error) {
      res.redirect("/register")
   }
})

router.post("/login", async (req,res)=>{
   try {
      const email = req.body.email
      const password = req.body.password
      const RegisteredUserEmail = await signupModel.findOne({email:email})
      const userPassword = await bcrypt.compare(password,RegisteredUserEmail.password);

      if(userPassword){
         res.status(201).redirect("/")
      }else{
         res.status(400).render("error")
      }
   } catch (e) {
      res.status(400).render("error")
   }
})

module.exports = router;

  