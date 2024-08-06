const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Creating the user endpoints

router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
//Creating the users endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.password === password) {
    res.send(user);
  } else {
    res.status(400).send("Invalid User Login credentials");
  }
});
module.exports = router;
