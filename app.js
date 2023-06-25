const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require('cookie-parser')

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser())

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://ehma12345:ehma12345@ehmacluster.t2qieqi.mongodb.net/node-auth";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
// app.get("/login", (req, res) => res.render("Login"));
app.use(authRoutes);
