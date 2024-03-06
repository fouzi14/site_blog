const mongoose = require("mongoose")
const joi = require("joi")


const CategorySchema = mongoose.Schema({
   
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    title :{
        type : String,
        required:true,
        trim : true
    },
   
},{timestamps:true});


const Category = mongoose.model("Categoty",CategorySchema)


function validateCreateCategory(obj){
    const schema = joi.object({
        title : joi.string().trim().required(),
    })
    return schema.validate(obj)
}



module.exports = {
    Category,
    validateCreateCategory
}