const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const app = express();
// DB config

const db = require("./config/keys").mongoURI;

//Connect to MongoDB

mongoose
  .connect(db)
  .then(() => console.log("MongooseDB success"))
  .catch(err => console.log(err));

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(morgan("dev"));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport.js")(passport);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
    return res.status(200).json({});
  }
  next();
});
// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Running " + port));
