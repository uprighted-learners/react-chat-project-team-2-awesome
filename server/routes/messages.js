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
  //Deleting the message within a room endpoint
  router.delete("/:id", async (req, res) => {
    try {
      await Message.findIdAndDelete(req.params.id);
      res.send({ message: "The message is deleted" });
    } catch (error) {
      res.status(400).send(error);
    }
  });
});
module.exports = router;
