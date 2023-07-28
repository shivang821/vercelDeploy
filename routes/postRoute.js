const User = require('../models/userSchema')
const express = require('express')
const { isAuthenticate } = require('../middleware/auth')
const router = express.Router()
const Post=require('../models/postSchema')

router.route('/new/post').post(isAuthenticate, uploadNewPost)

async function uploadNewPost(req, res) {
    try {
        let {postType,posts}=req.body;
        posts=JSON.parse(posts)
        const uploadData=await Post.create({postType,createdBy:req.user._id,posts});
        res.status(200).json({success:true})
    } catch (error) {
        console.log(error);
       res.status(400).json({success:false})
    }
}

module.exports = router;