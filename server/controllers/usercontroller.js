const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const User = require("../models/User");
const bryptjs = require("bcryptjs");

exports.getuserdetails = async (req,res) => {
    try{
        const id = req.user.id;
        const user = await User.findById(id).populate("blogs");
        user.password = undefined;
        return res.status(200).json({
            success : true,
            message : "User data fetched",
            user,
});
    }catch(e){
        return res.status(400).json({
            success : false,
            message : "Unable to fetch an user schema",
            e,
});
    }
}

exports.updateuser = async (req,res) => {
    try{
        const {name, email, password} = req.body;
        const id = req.user.id;

        let options = {};

        if(name)
        options.name = name;
        if(email)
        options.email = email;
        if(password)
        {
            const hashedpassword = await bryptjs.hash(password,10);
            options.password = hashedpassword;
        }

        try{
            const updateduser = await User.findByIdAndUpdate(id,options,{new : true});
            return res.status(200).json({
                success : true,
                message : "User has been successfully updated",
                updateduser,
    });
        }catch(e){
            return res.status(400).json({
                success : false,
                message : "Unable to update an user schema",
                e,
    });
        }
    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : "Unable to update an user",
            e,
});
    }
}

exports.deleteuser = async (req,res) => {
    try{
        const id = req.user.id;
        try{
            const deleteduser = await User.findByIdAndRemove(id, {new : true});
            const updatedblog = await Blog.deleteMany({
                _id : {
                    $in : deleteduser.blogs
                }
            },{new : true});
            const updatedcomments = await Comment.deleteMany({users : deleteduser._id},{new : true});
            return res.status(200).json({
                success : true,
                message : "User has been deleted successfully",
                deleteduser,
                updatedblog,
                updatedcomments
    });
        }catch(e){
            return res.status(400).json({
                success : false,
                message : "Unable to delete an user schema",
    });
        }
    }catch(e){
        return res.status(400).json({
            success : false,
            message : "Unable to delete an user",
});
    }
}