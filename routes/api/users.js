const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.get("/test", (req, res) => res.json({ msg: "Users work" }));

router.get("/all", (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(404).send(err);
    }
    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(404).send("No users in Database");
    }
  });
});
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(404).send(errors);
  }
  User.findOne({ email: req.body.email }, (err, result) => {
    if (result) {
      errors.email = "User already exists";
      return res.status(404).json(errors);
    } else {
      var url = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: url,
        password: req.body.password
      });

      bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) {
          return res.status(404).send(err);
        }
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.status(200).json(user))
          .catch(err => res.status(404).send(err));
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(404).send(errors);
  }

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.status(404).send(err);
    }
    if (user) {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // user match

          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };

          // Sign Token
          //res.status(200).send(user);
          jwt.sign(
            payload,
            keys.secretKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ password: "Wrong pass" });
        }
      });
    } else {
      return res.status(404).send({ email: "Users not found" });
    }
  });
});

module.exports = router;
