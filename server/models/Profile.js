const mongoose = require("mongoose");

const Profile = new mongoose.Schema({
    dob : {
        type : String,
        default : null,
    },
    mobilenumber : {
        type : String,
        default : null,
    },
    gender : {
        type : String,
        default : null,
    },
    bio : {
        type : String,
        default : null,
    }
});

module.exports = mongoose.model("Profile", Profile);