const User = require('../models/userSchema')
const express = require('express')
const sendToken = require('../utils/sendTolen')
const { isAuthenticate } = require('../middleware/auth')
const router = express.Router()
const cloudinary = require('cloudinary')
    // const star = require('./star.mp4')

router.route('/new/post').post(isAuthenticate, uploadNewPost)

async function uploadNewPost(req, res) {
    try {
        // const posts = req.body.posts;
        // console.log(req.body.posts[0]);
        // const postLinks = [];
        console.log("cal");
        // for (let i = 0; i < posts.length; i++) {
        //     const result = await cloudinary.v2.uploader.upload(posts[i], { resource_type: "video", folder: "posts" })
        //     postLinks.push({ public_id: result.public_id, url: result.secure_url })
        //     console.log(result);
        // }
        // const result = await cloudinary.v2.uploader
        //     .upload(req.body, {
        //         resource_type: "video",
        //         folder: "posts"
        //     })
        console.log(req.body);
        const result = await cloudinary.v2.uploader.upload(req.body, { folder: "products" })
        console.log("hi");
        // console.log(postLinks);
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false })
    }
}

module.exports = router;