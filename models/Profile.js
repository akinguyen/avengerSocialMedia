const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Profile = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  handle: { type: String, require: true },
  skills: { type: [String], require: true },
  experience: [
    {
      title: { type: String, require: true },
      company: { type: String, require: true },
      years: { type: Number, require: true }
    }
  ],
  education: [
    {
      school: { type: String, require: true },
      degree: { type: String, require: true },
      major: { type: String, require: true }
    }
  ],
  social: {
    youtube: { type: String },
    facebook: String
  }
});

module.exports = mongoose.model("Profile", Profile);
