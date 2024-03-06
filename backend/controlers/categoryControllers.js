const asynchandler= require("express-async-handler")
const {Category,validateCreateCategory} = require("../models/Category")


module.exports.createCategoryCntr=asynchandler(async(req,res)=>{
    const {error}=validateCreateCategory(req.body)
    if(error){
        return res.status(400).json({message : error.details[0].message})
    }
    const category = await Category.create({
        title : req.body.title,
        user: req.user.id
    })
    res.status(201).json(category)
})

module.exports.getAllCategoryCntr=asynchandler(async(req,res)=>{
    const category = await Category.find()
    res.status(201).json(category)
})

module.exports.deleteCategoryCntr=asynchandler(async(req,res)=>{
   const category = await Category.findById(req.params.id)
   if(!category){
    return res.status(400).json({message : "category not found"})
   }
   await Category.findByIdAndDelete(req.params.id)
   res.status(200).json({message : "category has been deleted seccusfuly", category_id : category._id})
})