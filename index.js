const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const app = express();

app.use(express.json());

// routes
// routes-books
const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

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
