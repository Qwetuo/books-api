const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const index = require("./routes/index");
const books = require("./routes/books.js");
const authors = require("./routes/authors.js");

const app = express();
app.use(logger("dev"));
app.use(express.json());
if (process.env.NODE + ENV === "production") {
  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGIN
    })
  );
} else {
  app.use(cors());
}

app.use("/", index);
books(app);
authors(app);
module.exports = app;
