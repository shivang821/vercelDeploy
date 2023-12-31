const User = require("../models/userSchema");
const Posts = require("../models/postSchema");
const express = require("express");
const sendToken = require("../utils/sendTolen");
const { isAuthenticate } = require("../middleware/auth");
const router = express.Router();
router.route("/signup").post(signUpUser);

async function signUpUser(req, res) {
  try {
    const { email, name, password, username } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ sucess: false, message: "username already exist" });
    }
    user = await User.create({ email, name, password, username });
    user.posts = 0;
    sendToken(user, 200, res, "user signup successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, success: false });
  }
}
router.route("/login").post(loginUser);

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "please enter username and password",
        });
    }
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      const posts = await Posts.find({ createdBy: user._id });
      user.numberOfPosts = posts.length;
      sendToken(user, 200, res, "user loged in successfully");
    } else {
      return res
        .status(400)
        .json({ success: false, message: "invalid details" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
}

router.route("/me").get(isAuthenticate, getDetails);

async function getDetails(req, res) {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const posts = await Posts.find({ createdBy: user._id });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
  }
}
module.exports = router;
