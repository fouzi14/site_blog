const asynchandler= require("express-async-handler")
const {User, validateUpdateUser} = require("../models/Users")
const bcrypt  = require("bcryptjs")
const path = require("path")
const { cloudinaryUploadImage, cloudinaryRemovImage, cloudinaryRemovMultipulImage } = require("../utils/cloudinary")
const fs =require("fs")
const { Post } = require("../models/Post")
const { Comment } = require("../models/Comment")


module.exports.getAllUsersCntr=asynchandler(async(req,res)=>{
   
    const users = await User.find().populate("post");
    res.status(200).json(users)
})

module.exports.getUsersCntr=asynchandler(async(req,res)=>{
   
    const user = await User.findById(req.params.id).populate("post");
    if(!user){
        res.status(200).json({message : "user not found"})
    }
    res.status(200).json(user)
})

module.exports.updateUserCntr=asynchandler(async(req,res)=>{
    const {error}=validateUpdateUser(req.body)
    if(error){
        return res.status(400).json({message : error.details[0].message})
    }
    if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password,salt)
    }

    const updateuser = await User.findByIdAndUpdate(req.params.id,{
        $set : {
            username : req.body.username,
            password:req.body.password,
            bio : req.body.bio
        }
    },{new:true})
    res.status(201).json(updateuser)
})


module.exports.getUsersCountCntr=asynchandler(async(req,res)=>{
    const count = await User.find();
    res.status(200).json(count.length)
})

module.exports.profilPhotoUplaod=asynchandler(async(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"not provided file"})
    }
    const imagepath = path.join(__dirname,`../image/${req.file.filename}`);

    const result = await cloudinaryUploadImage(imagepath);
    const user =await User.findById(req.user.id);
    if(user.profilPhoto.publicId !== null){
        await cloudinaryRemovImage(user.profilPhoto.publicId);
    }
    user.profilPhoto = {
        url: result.secure_url,
        publicId:result.public_id
    }

    await user.save()

    res.status(200).json({message : " photo upload succeful",
                        profilPhoto:{url: result.secure_url,publicId:result.public_id}
                        })

    fs.unlinkSync(imagepath)
})


module.exports.deleteUserProfilCntr=asynchandler(async (req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(404).json({message : "user not found"})
    }
    const posts = await Post.find({user : user._id})
    const publicIds = posts?.map(post => post.image.publicId)

    if(publicIds?.length >0){
        await cloudinaryRemovMultipulImage(publicIds)
    }
    await cloudinaryRemovImage(user.profilPhoto.publicId)

    await Post.deleteMany({user:user._id})
    await Comment.deleteMany({user:user._id})


    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "your profil has been deleted"})
})