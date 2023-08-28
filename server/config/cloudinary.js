const cloudinary = require("cloudinary").v2;
require("dotenv").config();

exports.connectwithcloudinary = async () => {
    try{
        await cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret : process.env.API_SECRET,
        });
        console.log("Connection with cloudinary is successfull");
    }
    catch(e){
        console.log(e);
    }
}