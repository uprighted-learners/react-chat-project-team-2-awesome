// consts
require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const roomRoutes = require("./routes/rooms");
const messageRoutes = require("./routes/messages");



const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);
app.use("/messages", messageRoutes);

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/chat-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
