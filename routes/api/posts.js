const express = require("express");
const router = express.Router();
//const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validatePostInput = require("../validation/post");

router.get("/test", (req, res) => res.json({ msg: "Posts work" }));

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).send({ post: "Not found" });
      }
    })
    .catch(err => res.status(404).send(err));
});

// Get list of posts
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).send(err));
});

//Create a post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(404).send(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

/// Like
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(() => {
        Post.findById(req.params.id)
          .populate("user", ["name", "avatar"])
          .then(post => {
            if (post) {
              if (
                post.likes.filter(like => like.user.toString() === req.user.id)
                  .length > 0
              ) {
                return res.status(404).send({ like: "User did like" });
              }
              post.likes.unshift({ user: req.user.id });
              post.save().then(post => {
                res.status(200).send(post);
              });
            } else {
              res.status(404).send({ post: "Cannot find post" });
            }
          })
          .catch(err => res.status(404).send({ post: "Cannot find post" }));
      })
      .catch(err => res.status(404).send({ profile: "Cannot find the user" }));
  }
);

/// Unlike
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(() => {
        Post.findById(req.params.id)
          .populate("user", ["name", "avatar"])
          .then(post => {
            if (post) {
              const removeIndex = post.likes
                .map(like => like.user.toString())
                .indexOf(req.user.id.toString());
              if (removeIndex >= 0) {
                post.likes.splice(removeIndex, 1);
                post.save().then(post => res.status(200).send(post));
              } else {
                res.status(200).send({ unlike: "User did unlike" });
              }
            } else {
              res.status(404).send({ post: "Cannot find post" });
            }
          })
          .catch(err => res.status(404).send({ post: "Cannot find post" }));
      })
      .catch(err => res.status(404).send({ profile: "Cannot find the user" }));
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(() => {
        Post.findById(req.params.id)
          .populate("user", ["name", "avatar"])
          .then(post => {
            if (post) {
              if (post.user.id !== req.user.id) {
                return res.status(404).send({ post: "User not authorized" });
              }
              //res.status(200).send(post);
              post.remove().then(() => res.json({ success: true }));
            } else {
              res.status(404).send({ post: "Cannot find post" });
            }
          })
          .catch(err => res.status(404).send({ post: "Cannot find post" }));
      })
      .catch(err => res.status(404).send({ profile: "Cannot find the user" }));
  }
);

//// Comment

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        const comment = {
          user: req.user.id,
          text: req.body.text,
          name: req.user.name,
          avatar: req.user.avatar
        };
        if (post) {
          post.comment.unshift(comment);
          post.save().then(post => res.status(200).send(post));
        } else {
          res.status(404).send({ post: "Cannot find post" });
        }
      })
      .catch(err => res.status(404).send({ post: "Cannot find post" }));
  }
);

// Uncomment

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (post) {
          const removeIndex = post.comment
            .map(c => c.id.toString())
            .indexOf(req.params.comment_id.toString().trim());

          if (removeIndex >= 0) {
            post.comment.splice(removeIndex, 1);
            post.save().then(post => {
              res.status(200).send(post);
            });
          } else {
            res.status(404).send({ comment: "Cannot find comment" });
          }
        } else {
          res.status(404).send({ post: "Cannot find post" });
        }
      })
      .catch(err => res.status(404).send({ post: "Cannot find post" }));
  }
);

module.exports = router;
