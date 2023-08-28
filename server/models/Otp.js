const mongoose = require("mongoose");
const {sendmails} = require("../utils/sendmails");

const Otp = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required : true,
    },
    time : {
        type : Date,
        default : Date.now(),
        expires: 60*5,
    },
});

const mail = async (email,title,body) => {
    try{
        await sendmails(email,title,body);
        console.log("mail sent");
    }
    catch(e){
        console.log("Error");
    }
}

Otp.pre("save", async function (next)  {
    console.log("document saved");
    if(this.isNew)
        await mail(this.email,"OTP",this.otp);
    next();
});

module.exports = mongoose.model("Otp", Otp);