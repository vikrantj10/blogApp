const mongoose = require("mongoose");

const Blog = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    thumbnail : {
        type : String,
        required : true,
    },
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }],
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment",
    }],
    publicationdate : {
            type : Date,
            default : Date.now(),
    },
    category: {
        type: String,
        enum: ["Sports", "Education", "Technology"],
    },
    tags : [{
        type : String,
    }],
});

module.exports = mongoose.model("Blog", Blog);