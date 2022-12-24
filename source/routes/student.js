const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../../multer");
const student = require("../models/studentModel");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new user
    let user = new student({
      name: req.body.name,
      section:req.body.section,
      photoUrl: result.secure_url,
      cloudinary_id: result.public_id,
      address:{
         line1:req.body.line1,
         line2:req.body.line2,
         city:req.body.city,
         state:req.body.state
      },
      parents:[{
         name:req.body.fatherName,
         phoneNumber:req.body.number,
         email:req.body.email,
         designation:req.body.desugnation
      }]
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let user = await User.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Delete user from db
    await user.remove();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || user.name,
      avatar: result?.secure_url || user.avatar,
      cloudinary_id: result?.public_id || user.cloudinary_id,
    };
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;





// const express = require("express");
// const router = express.Router();

// const User = require("../models/studentModel")
// const cloudinary = require("../../utils/cloudinary");
// const upload = require("../../utils/multer");

// router.post("/",upload.single("image"),async (req,res) =>{
//    try {
//       const result = await cloudinary.uploader.upload(req.file.path)

//       //create instance of student
//       let user = new User({
//          name:req.body.name,
//          rollNumber:req.body.rollNumber,
//          standard:req.body.standard,
//          section:req.body.section,
//          photoUrl:result.secure_url,
//          cloudinary_id:result.public_id,
         
//       })
//       //save user
//       await user.save()
//       res.json(result)
//    } catch (err) {
//       console.log(err);
//    }
// })


// module.exports = router;