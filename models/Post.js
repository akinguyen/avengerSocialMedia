const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  text: { type: String, require: true },
  name: { type: String, require: true },
  avatar: { type: String, require: true },
  date: {
    type: Date,
    default: Date.now
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ],
  comment: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      text: {
        type: String,
        require: true
      },
      name: {
        type: String,
        require: true
      },
      avatar: {
        type: String,
        require: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("Post", Post);
