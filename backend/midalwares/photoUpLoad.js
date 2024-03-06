const multer = require("multer")
const path = require("path")

const photoStorage = multer.diskStorage({
    destination : function(req , file , cb){
        cb(null,path.join(__dirname,"../image"))
    },
    filename : function(req,file,cb){
        if(file){
            cb(null,new Date().toISOString().replace(/:/g,"-") + file.originalname)
        }else{
            cb(null,false)
        }
    }
})

const photoUplaod = multer({
    storage : photoStorage,
    fileFilter : function(req,file,cb){
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }else{
            cb({message : "unsepport forma"},false)
        }
    },
    limits:{fileSize : 1024 * 1024}
})

module.exports = photoUplaod