const mongoose = require("mongoose");

require("dotenv").config();

const DB_URL = process.env.DB_URL;

exports.connectDb = async () => {
    try{
        await mongoose.connect(DB_URL);
        console.log("Connection with db is successful");
    }
    catch(e){
        console.log("Couldn't able to connect with db");
    }
    
}