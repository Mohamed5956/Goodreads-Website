const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;
const User = require("./models/users");
const auth = require("./middlewares/auth");
app.use(express.json());
app.use(cors());
// routes
// routes-books
const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

// routes-register
const registerRouter = require("./routes/register");
app.use("/register", registerRouter);

// routes-login
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

// routes-
app.use("/Welcome", auth, (req, res) => {
  res.send(" ♥♥♥♥♥♥♥   Welcome 🙌 ♥♥♥♥♥♥♥♥ ");
});

// routes-categories
const categoriesRouter = require("./routes/categories");
app.use("/categories", categoriesRouter);

// routes-reviews
const reviewsRouter = require("./routes/review");
app.use("/reviews", reviewsRouter);

// routes-authors
const authorsRouter = require("./routes/author");
app.use("/authors", authorsRouter);

// db connection

mongoose.connect(DB_URL);

// server connection
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
