const asynchandler= require("express-async-handler")
const bcrypt = require("bcryptjs")
const {User,validateRegesterUser, validateLoginUser} = require("../models/Users")

module.exports.regesterUserCntr=asynchandler(async(req,res)=>{
    const {error} = validateRegesterUser(req.body);
    if(error){
       return res.status(400).json({message : error.details[0].message})
    }
    let user =await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({message : "user already exist"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password,salt);

    user = new User({
        username : req.body.username,
        email : req.body.email,
        password : hashpassword
    })

    await user.save();
    res.status(201).json({message : "you register seccussfuly , please log in "})

});


module.exports.loginUserCntr=asynchandler(async(req,res)=>{
    const {error} = validateLoginUser(req.body);
    if(error){
        return res.status(400).json({messsage : error.details[0].message})
    }
    const user = await User.findOne({email : req.body.email})
    if(!user){
        return res.status(400).json({message : "invalid email or password"})
    }

    const ispassword =  await bcrypt.compare(req.body.password , user.password);
    if(!ispassword){
        return res.status(400).json({message : "invalid email or password"})
    }
    const token = user.genirateToken() ;
    res.status(200).json({
        _id : user._id,
        isAdmin :  user.isAdmin,
        profilPhoto : user.profilPhoto,
        token : token,
        username:user.username,
        
    })
})