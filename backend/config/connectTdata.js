const mongoose = require("mongoose")

module.exports = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo_db is connected ...");

    }catch(error){
        console.log("failed connection ",error);
    }
}