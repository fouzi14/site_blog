const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const joi = require("joi")
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        trim : true, 
        require: true,
        minlength : 2,
        maxlength : 100
    },
    email : {
        type : String,
        trim : true, 
        require: true,
        minlength : 5,
        maxlength : 100,
        unique: true
    },
    password : {
        type : String,
        trim : true, 
        require: true,
        minlength : 8,
    },
    profilPhoto : {
        type : Object,
        default:{
            url:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            publicId:null
        }
        
    },
    bio:{
        type : String,
    },
    isAdmin:{
        type : Boolean,
        default:false
    },
    isAcountVerified:{
        type : Boolean,
        default:false
    },
},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}});
userSchema.virtual("post",{
    ref:"Post",
    foreignField:"user",
    localField:"_id"
})
userSchema.methods.genirateToken=function(){
    return jwt.sign({id : this._id,isAdmin : this.isAdmin},process.env.JWT_SUCRET)
}
const User = mongoose.model("User",userSchema);

function validateRegesterUser(obj){
    const schema = joi.object({
        username : joi.string().trim().min(2).max(100).required(),
        email : joi.string().trim().min(5).max(100).required().email(),
        password : joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}
function validateLoginUser(obj){
    const schema = joi.object({
        email : joi.string().trim().min(5).max(100).required().email(),
        password : joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}


function validateUpdateUser(obj){
    const schema = joi.object({
        username : joi.string().trim().min(2).max(100),
        password : joi.string().trim().min(8),
        bio:joi.string()
    });
    return schema.validate(obj);
}
module.exports ={
    User,
    validateRegesterUser,
    validateLoginUser,
    validateUpdateUser
}