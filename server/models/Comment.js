const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
    users : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
}],
    description : {
        type : String,
        required : true,
    },
    time : {
        type : Date,
        default : Date.now(),
    }
});

module.exports = mongoose.model("Comment", Comment);