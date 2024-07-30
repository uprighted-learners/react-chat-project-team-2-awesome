const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

//Creating the Middleware Here
app.use(bodyParser.json());

//Connecting to the MongoDB
mongoose.connect("mongodb://localhost:27017/chat-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//creating the routes
app.use("/api/users", require("./routes/users"));
app.use("/api/rooms", require("./routes/rooms"));
app.use("/api/messages", require("./routes/messages"));

//creating the app listen
app.listen(port, () => {
  console.log(`The Server is running on port ${port}`);
});
