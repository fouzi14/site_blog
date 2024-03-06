const asynchandler= require("express-async-handler")
const {Comment, validateCreateComment,validateUpdateComment} = require("../models/Comment")
const {User} = require("../models/Users")


module.exports.createCommentCntr = asynchandler(async(req,res)=>{
    const{error}=validateCreateComment(req.body)
    if(error){
        return res.status(404).json({message : error.details[0].message})
    }
    const profil = await User.findById(req.user.id)
    const comment = await Comment.create({
        postId : req.body.postId,
        text : req.body.text,
        user:req.user.id,
        username:profil.username
    })
    res.status(200).json(comment)
})


module.exports.getAllCommentCntr=asynchandler(async(req,res)=>{
    const comment = await Comment.find().populate("user")
    res.status(200).json(comment)
})

module.exports.deleteCommentCntr=asynchandler(async(req,res)=>{
    const comment = await Comment.findById(req.params.id)
    if(!comment){
        return res.status(200).json({message : "comment not found"})
    }

    if(req.user.isAdmin || req.user.id === comment.user.toString()){
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({message :  "comment has been deleted"})
    }else{
        res.status(403).json({message :  "access denied"})

    }
})


module.exports.updateCommentCntr = asynchandler(async(req,res)=>{
    const{error}=validateUpdateComment(req.body)
    if(error){
        return res.status(404).json({message : error.details[0].message})
    }
    const comment = await Comment.findById(req.params.id)
    if(!comment){
        return res.status(404).json({message : "comment not found"})
    }

    if(req.user.id !== comment.user.toString()){
        return res.status(404).json({message : "acces denid"})
    }
    const updatecomment = await Comment.findByIdAndUpdate(req.params.id,{
        $set: {
            text : req.body.text,
        }
    },{new : true})
    res.status(200).json(updatecomment)
})
