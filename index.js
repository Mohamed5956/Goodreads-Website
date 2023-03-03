const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TOKEN_KEY =process.env.TOKEN_KEY || "abdomagdy"
const User = require('./models/register')
const auth = require('./middlewares/auth')
app.use(express.json());

// routes

const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

const registerRouter = require("./routes/register");
app.use("/register", registerRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

app.use("/Welcome",auth , (req,res) => {
  res.send(" ♥♥♥♥♥♥♥   Welcome 🙌 ♥♥♥♥♥♥♥♥ ")
});










// db connection

mongoose.connect(DB_URL);

// server connection
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
