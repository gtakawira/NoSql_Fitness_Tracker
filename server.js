const express = require("express");
const mongoose = require("mongoose");
const dotenv =require('dotenv').config()

const PORT = process.env.PORT ;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});



// routes
app.use(require("./controllers"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

