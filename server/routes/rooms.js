const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

//Creating the room endpoints
router.post("/", async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).send(room);
  } catch (error) {
    res.status(400).send(error);
  }
})
  //Displaying the rooms endpoints
  router.get("/", async (req, res) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms)
    } catch (error) {
      res.status(400).send(error);
    }
  });
module.exports = router;
