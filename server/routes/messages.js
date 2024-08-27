const express = require("express");
const router = express.Router();
const Message = require("../Models/Message");

//Displaying the messages within the room endpoint
router.get("/:roomId", async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId }).populate(
      "user"
    );
    res.send(messages);
  } catch (error) {
    res.status(400).send(error);
  }
});
//creating the message within the room endpoint
router.put("/:id", async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(message);
  } catch (error) {
    res.status(400).send(error);
  }
});
//Deleting the message within a room endpoint
router.delete("/:id", async (req, res) => {
  try {
    await Message.findOneAndDelete({ _id: req.params.id });
    res.send({ message: "The message is deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/message/:userID", async (req, res) => {
  try {
    // Create a new message using the data from the request body
    const newMessage = new Message({
      user: req.params.userID,
      room: req.body.room,
      body: req.body.body,
    });
    await newMessage.save();

    // Send a response with the created message
    res
      .status(201)
      .send({ message: "The message is created", data: newMessage });
  } catch (error) {
    // Handle any errors that occur during message creation
    res.status(400).send({ error: error.message });
  }
});
module.exports = router;
