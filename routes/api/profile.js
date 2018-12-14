const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const profileValidator = require("../validation/profile");
router.get("/test", (req, res) => res.json({ msg: "Profile Work" }));

//Get all profiles
router.get("/all", (req, res) => {
  Profile.find()
    .populate("user", ["name", "avatar"])
    .exec((err, result) => {
      if (err) {
        return res.status(404).send(err);
      }
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ hasProfile: false });
      }
    });
});

//Get current profile
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(result => {
        res.send(result);
      });
  }
);

//Create a profile for current user
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = profileValidator.validateProfileInput(req.body);
    if (!isValid) {
      return res.status(404).send(errors);
    }
    const skills = req.body.skills.split(",");
    const social = {};
    social.youtube = req.body.youtube;
    social.facebook = req.body.facebook;
    const profileField = {
      user: req.user.id,
      handle: req.body.handle,
      skills: skills,
      social: social
    };
    Profile.findOne({ user: req.user.id }, (err, result) => {
      if (result) {
        Profile.findOne({ handle: req.body.handle })
          .populate("user", ["name", "avatar"])
          .then(profile => {
            if (profile) {
              if (profile.user.id === req.user.id) {
                profileField.handle = req.body.handle;
              } else {
                return res
                  .status(404)
                  .send({ handle: "Handle already exists" });
              }
            }
            Profile.findOneAndUpdate(
              { user: req.user.id },
              { $set: profileField },
              { new: true }
            ).then(result => {
              res.status(200).send(result);
            });
          })
          .catch(err => res.status(404).send(err));
      } else {
        new Profile(profileField)
          .save()
          .then(result => {
            res.status(200).send(result);
          })
          .catch(err => res.status(404).send(err));
      }
    });
  }
);

//Get profile based on handle
router.get(
  "/handle/:handle",

  (req, res) => {
    Profile.findOne({ handle: req.params.handle })
      .populate("user", ["name", "avatar"])
      .then(result => {
        if (result) {
          return res.send(result);
        }
        return res.status(404).send({ user: "Cannot find the user" });
      })
      .catch(err => {
        res.send(err);
      });
  }
);

//Get profile based on userId
router.get("/user/:id", (req, res) => {
  Profile.findOne({ user: req.params.id })
    .populate("user", ["name", "avatar"])
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send({ user: "Cannot find the user" });
    });
});

//Create experience on profile
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = profileValidator.validateExpInput(req.body);

    if (!isValid) {
      return res.status(404).send(errors);
    }
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(result => {
        if (result) {
          const exp = {};
          exp.title = req.body.title;
          exp.company = req.body.company;
          exp.years = req.body.years;
          result.experience.push(exp);
          result.save().then(profile => res.status(200).send(profile));
        } else {
          res.status(404).send({ user: "Please create the profile" });
        }
      })
      .catch(err => res.status(404).send({ user: "Cannot find user" }));
  }
);

//Get experience of the current user
router.get(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(result => {
      res.status(200).send(result.experience);
    });
  }
);

//Create education of the current user
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = profileValidator.validateEduInput(req.body);

    if (!isValid) {
      return res.status(404).send(errors);
    }
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(result => {
        if (result) {
          const education = {};
          education.school = req.body.school;
          education.degree = req.body.degree;
          education.major = req.body.major;
          result.education.push(education);
          result.save().then(profile => res.status(200).send(profile));
        } else {
          res.status(404).send({ user: "Please create the profile" });
        }
      });
  }
);

//Get education of the current user
router.get(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(result => {
      res.status(200).send(result.education);
    });
  }
);

//Delete the profile's experience based on expId
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(result => {
      const removeIndex = result.experience
        .map(e => e.id)
        .indexOf(req.params.exp_id);
      if (removeIndex >= 0) {
        result.experience.splice(removeIndex, 1);
        result.save().then(profile => {
          res.status(200).send(profile);
        });
      } else {
        res.status(404).send({ success: false });
      }
    });
  }
);

//Delete profile's education based on eduId
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(result => {
      const removeIndex = result.education
        .map(e => e.id)
        .indexOf(req.params.edu_id);
      if (removeIndex >= 0) {
        result.education.splice(removeIndex, 1);
        result.save().then(profile => {
          res.status(200).send(profile);
        });
      } else {
        res.status(404).send({ success: false });
      }
    });
  }
);

// delete user and profile
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.status(200).send({ success: true });
      });
    });
  }
);
module.exports = router;
