const asynchandler= require("express-async-handler")
const {Post, validateCreatPost,validateUpdatePost} = require("../models/Post")
const {Comment} = require("../models/Comment")

const path = require("path")
const fs = require("fs")
const { cloudinaryUploadImage, cloudinaryRemovImage } = require("../utils/cloudinary")
module.exports.createPostCntr=asynchandler(async(req,res)=>{
    if(!req.file){
        return res.status(404).json({message :  "image not found"})
    }
    const {error}=validateCreatPost(req.body)
    if(error){
        return res.status(400).json({message : error.details[0].message})
    }
    const imagepath = path.join(__dirname,`../image/${req.file.filename}`)

    const result = await cloudinaryUploadImage(imagepath)

    const post = new Post({
        titel : req.body.titel,
        description: req.body.description,
        category:req.body.category,
        user: req.user.id,
        image:{
            url : result.secure_url,
            publicId:result.public_id
        } 

    })
    await post.save()
    res.status(200).json(post)
    fs.unlinkSync(imagepath)
})

module.exports.getAllPostCntr=asynchandler(async(req,res)=>{
    const POST_PER_PAGE=3;
    const {pageNumber,category}=req.query;
    let post ;
    if(pageNumber){
        post=await Post.find()
            .skip((pageNumber-1)*POST_PER_PAGE)
            .limit(POST_PER_PAGE)
            .sort({createdAt : -1})
            .populate("user",["-password"])
    }else if(category){
        post = await Post.find({category}).sort({createdAt : -1}).populate("user",["-password"])
    }else{
        post = await Post.find().sort({createdAt : -1}).populate("user",["-password"]).populate("comment")
    }

    res.status(200).json(post)

})


module.exports.getSingelPostCntr=asynchandler(async(req,res)=>{
   const post = await Post.findById(req.params.id).populate("user",["-password"]).populate("comment")
   if(!post){
    return res.status(404).json({message : "post not found"})
   }
    res.status(200).json(post)

})


module.exports.getPostCountCntr=asynchandler(async(req,res)=>{
    const count = await Post.find();
    res.status(200).json(count.length)
})


module.exports.deletePostCntr=asynchandler(async(req,res)=>{
    const post = await Post.findById(req.params.id)
    if(!post){
     return res.status(404).json({message : "post not found"})
    }
     if(req.user.isAdmin || req.user.id == req.post.toString()){
        await Post.findByIdAndDelete(req.params.id)
        await cloudinaryRemovImage(post.image.publicId)
        await Comment.deleteMany({postId : post._id})

        res.status(200).json({message: "post has been deleted" ,postId : post._id})
     }else{
        res.status(403).json({message: "access denied" })
     }
 
 })



 module.exports.updatePostCntr=asynchandler(async(req,res)=>{


    const {error}=validateUpdatePost(req.body)
    if(error){
        return res.status(403).json({message : error.details[0].message})
    }
    const post = await Post.findById(req.params.id).populate("user",["-password"])
    if(!post){
     return res.status(404).json({message : "post not found"})
    }
    console.log(req.user.id !== post.user.toString());
    console.log(req.user.id);
    console.log(post.user._id.toString());
    if(req.user.id !== post.user._id.toString()){
        return res.status(404).json({message : "access denied"})
    }

    const updatepost = await Post.findByIdAndUpdate(req.params.id,{
        $set:{
            titel:req.body.titel,
            description:req.body.description,
            category : req.body.category
        }
    },{new:true,}).populate("user",["-password"])
     res.status(200).json(updatepost)
 
 })

 
 module.exports.updateImageCntr=asynchandler(async(req,res)=>{
    if(! req.file){
        return res.status(400).json({message : "file not found"})
    }
    const post = await Post.findById(req.params.id).populate("user",["-password"])
    if(!post){
     return res.status(404).json({message : "post not found"})
    }
    
    
    if(req.user.id !== post.user._id.toString()){
        return res.status(404).json({message : "access denied"})
    }
    await cloudinaryRemovImage(post.image.publicId)
    const imagepath = path.join(__dirname,`../image/${req.file.filename}`)

    const result = await cloudinaryUploadImage(imagepath)

    const updateimage = await Post.findByIdAndUpdate(req.params.id,{
        $set:{
            image:{
                url:result.secure_url,
                publicId:result.public_id
            }
        }
    },{new:true,})
     res.status(200).json(updateimage)
 
 })



 module.exports.toggleLikeCntr=asynchandler(async(req,res)=>{
    let post = await Post.findById(req.params.id)
    if(!post){
        return res.status(404).json({message : "post not found"})
    }

    const istoggleliked = post.like.find(user => user.toString()===req.user.id)
    if(istoggleliked){
        post = await Post.findByIdAndUpdate(req.params.id,{
            $pull : {like : req.user.id}
        },{new:true})
    }else{
        post = await Post.findByIdAndUpdate(req.params.id,{
            $push : {like : req.user.id}
        },{new:true})
    }
    res.status(200).json(post)
 })