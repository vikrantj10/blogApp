const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const otpgen = require("otp-generator");
const Otp = require("../models/Otp");

require("dotenv").config();

exports.signup = async (req,res) => {
    try{
        
        const {name, email, password, otp} = req.body;
        
        if(!name || !email || !password || !otp)
            return res.status(400).json({
                success : false,
                message : "All fields are mandatory",
        });

        const isexist = await User.findOne({email});
        if(isexist)
            return res.status(400).json({
                success : false,
                message : "Please login, You already have an account",
        });

        //const result = await Otp.find({email}).sort({time : -1}).limit(1);

        const result = await Otp.findOne({ email }).sort({ time: -1 }).limit(1);

        if(!result)
            return res.status(400).json({
            success : false,
            message : "Resend otp again, time expired!",
    });

        if(otp!==result.otp)
            return res.status(400).json({
                success : false,
                message : "Otp is not correct, Check again!",
    });

        const hashedpassword = await bcryptjs.hash(password,10);

        const createduser = await User.create({
            name : name,
            email : email,
            password : hashedpassword,
            avatar : `https://api.dicebear.com/6.x/pixel-art/svg?seed=${name}`,
        });

        if(!createduser){
            return res.status(400).json({
                success : false,
                message : "Unable to create an user",
        });
        }  
        
        return res.status(200).json({
            success : true,
            message : "You have been succesfully registered, Login!",
            response : createduser,
    });

    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : "Unable to create an user, Try again later!",
    });
    }
}

exports.sendotp = async (req,res) => {
    try{
        const {email} = req.body;
        if(!email)
            return res.status(400).json({
                success : false,
                message : "Please enter your valid email",
});
        const user = await User.findOne({email});
        if(user)
            return res.status(400).json({
                success : true,
                message : "You are already registered, Please login!",
});
        const otp = otpgen.generate(6);
        const saveotp = await Otp.create({
            email, otp
        });

        return res.status(200).json({
            success : true,
            message : "Otp sent successfully, Please check your mail!",
            saveotp,
});
        
    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : "Unable to send otp",
});
    }
}

exports.login = async (req,res) => {
    try{

        const {email, password} = req.body;

        if(!email || !password)
            return res.status(400).json({
                success : false,
                message : "All fields are mandatory",
        });

        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({
                success : false,
                message : "Please sign up first!",
    });

        const matched = await bcryptjs.compare(password,user.password);
        if(!matched)
            return res.status(400).json({
                success : false,
                message : "Please check your email or password",
    });

        const token = jwt.sign({
            email : user.email, id : user._id
        },process.env.JWT_SECRET,{
            expiresIn : "2h"
        });

        user.token = token;
        user.password = undefined;
        
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        return res.cookie("token",token,options).status(200).json({
            success : true,
            message : "Welcome!",
            token,
            user,
});
    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : "Unable to logged in",
    });
    }
}