const User = require('../models/userSchema')
const express = require('express')
const { isAuthenticate } = require('../middleware/auth')
const router = express.Router()
const Post=require('../models/postSchema')
const { upload } = require('../middleware/multer')
const getDataUri = require('../utils/DataUri')
const cloudinary=require('cloudinary')
router.route('/new/post').post(isAuthenticate,upload, uploadNewPost)

async function uploadNewPost(req, res) {
    try {
        const files=req.files;
        const {postType}=req.body;
        const posts=[]
            for(let i=0;i<files.length;i++){
                const fileUri=getDataUri(files[i]);
                const fileType=fileUri.mimetype.substring(0, fileUri.mimetype.indexOf('/'))
                const myCloud=await cloudinary.v2.uploader.upload(fileUri.content,{resource_type:'auto'});
                let postObj={url:myCloud.url,uid:myCloud.public_id,fileType};
                posts.push(postObj);
            }
        const post=await Post.create({posts,createdBy:req.user._id,postType,isPublic:req.user.isPublic})
        await User.findByIdAndUpdate(req.user._id,{numberOfPosts:req.user.numberOfPosts+1});
        res.status(200).json({success:true})
    } catch (error) {
        console.log(error);
       res.status(400).json({success:false})
    }
}
router.route('/reels').get(sendReels)
async function sendReels(req,res){
    try {
        let page=Number(req.query.page)||1
        let limit=Number(req.query.limit)||8
        let skip=(page-1)*limit
        const totalResult=await Post.find({postType:"reel"}).count();
        const reels=await Post.find({postType:"reel"}).skip(skip).limit(limit).populate('createdBy');
        let totalResultSend=((page-1)*limit)+reels.length;
        let hasMore=totalResultSend<totalResult
        res.status(200).json({reels,totalResult,hasMore})
    } catch (error) {
        console.log(error);
        res.status(400).json({error:'somthing went wrong'});
    }
}

router.route('/upload').post(upload,uploadData)
async function uploadData(req,res){
    try {
        const file=req.file;
        const fileUri=getDataUri(file);
        const myCloud=await cloudinary.v2.uploader.upload(fileUri.content,{resource_type:'auto'});
        res.status(200).json({success:'true'})
    } catch (error) {
        console.log(error);
    }
}

module.exports = router;