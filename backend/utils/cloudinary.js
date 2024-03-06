const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadImage = async(filetoupload)=>{
    try {
        const data =cloudinary.uploader.upload(filetoupload);
            
        return data
    } catch (error) {
        return error;
    }
}


const cloudinaryRemovImage=async(imagepublicId)=>{
    try {
        const result =cloudinary.uploader.destroy(imagepublicId);
        
        return result;
    } catch (error) {
        return error
    }
}


const cloudinaryRemovMultipulImage=async(publicIds)=>{
    try {
        const result =cloudinary.v2.api.delete_resources(publicIds);
        
        return result;
    } catch (error) {
        return error
    }
}
module.exports={
    cloudinaryRemovImage,
    cloudinaryUploadImage,
    cloudinaryRemovMultipulImage
}