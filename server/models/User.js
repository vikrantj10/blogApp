const mongoose = require("mongoose");

const User = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    avatar : {
        type : String,
        required : true,
    },
    /*additionaldetails : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile",
    },*/
    token : {
        type : String,
    },
    blogs : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Blog",
        }
    ]
});

module.exports = mongoose.model("User", User);