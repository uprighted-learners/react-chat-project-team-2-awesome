const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require ('bcrypt');
const JWT = require("jsonwebtoken");

//Creating the user endpoints

router.post("/create", async (req, res) => {
 const saltRounds = parseInt(process.env.SALT);
  bcrypt.hash(req.body.password, saltRounds, async(err, hash) =>{
    try {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
      });
      await user.save();
      let token = JWT.sign({id:user._id}, process.env.JWTKEY, {expiresIn:"1 day"} )
      res.status(201).json({
        User: user,
        Token: token,
      });

    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  })
  
});
//Creating the login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  

  if (await bcrypt.compare(password, user.password)) {
    res.send(user);
  } else {
    res.status(400).send("Invalid User Login credentials");
  }
});
module.exports = router;
