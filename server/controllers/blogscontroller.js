const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const User = require("../models/User");
const { uploadfile } = require("../utils/uploadfile");
require("dotenv").config();

exports.getallblogdetails = async (req,res) => {
    try{
        const blogs = await Blog.find().populate({
            path : "comments",
            populate : {
                path : "users"
            }
        });
        return res.status(200).json({
            success : true,
            message : "Blog data fetched",
            blogs,
});
    }catch(e){
        return res.status(400).json({
            success : false,
            message : "Unable to fetch blog schema",
            e,
});
    }
}

exports.getblogbyid = async (req,res) => {
    try{
        const id = req.params.id;
        const blogs = await Blog.findById(id).populate("comments");
        return res.status(200).json({
            success : true,
            message : "Blog data fetched",
            blogs,
});
    }catch(e){
        return res.status(400).json({
            success : false,
            message : "Unable to fetch an user schema",
            e,
});
    }
}

exports.createblog = async (req,res) => {
    try{
        let {title, description, category, tags} = req.body;

        if(!req.files)
        return res.status(400).json({
            success : false,
             message : "All fields are mandatory",
});

        const file = req.files.file;
        const id = req.user.id;

        tags = tags.split(",");
        if(!title || !description || !tags)
            return res.status(400).json({
                success : false,
                 message : "All fields are mandatory",
    });
        const savedfile = await uploadfile(file,process.env.FOLDER_NAME);

        const blog = await Blog.create({
            title, description, category, thumbnail : savedfile.secure_url, tags
        });

        const user = await User.findById(id); 

        if(!user){
            return res.status(400).json({
                success : false,
                message : "User is no longer available!",
        });
        }

        user.blogs.push(blog._id);

        await user.save();

        return res.status(200).json({
            success : true,
            message : "Blog has been created successfully, please check your blog on home page!",
            blog
    });

    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : "Unable to create a blog",
    });
    }
}

exports.updateblog = async (req,res) => {
    try{
        let {title, description, category, tags, blogid} = req.body;
        let file;

        if(req.files && req.files.file)
        file = req.files.file;

        let update = {};

        if(title)
        update.title = title;
        
        if(description)
        update.description = description;

        if(category)
        update.category = category;
        
        if(tags)
        {
            tags = tags.split(",");
            update.tags = tags;
        }

        if(!blogid)
            return res.status(400).json({
                success : false,
                message : "No such blog",
    });

        if(file){
            const uploadedfile = await uploadfile(file,process.env.FOLDER_NAME);
            update.thumbnail = uploadedfile.secure_url;
        }

        try{
            const updatedblog = await Blog.findByIdAndUpdate(blogid,update,{new : true});
            return res.status(200).json({
                success : true,
                message : "Blog gets updated successfully!",
                updatedblog
    });
        }
        catch(e){
            return res.status(400).json({
                success : false,
                message : "Unable to update the blog",
    });
        }
    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : "Error in updating the blog",
});
    }
};

exports.deleteblog = async (req,res) => {
    try{
        const {blogid} = req.body;
        const userid = req.user.id;

        if(!blogid || !userid)
        return res.status(400).json({
            success : false,
            message : "userid or blogid is missing",
});

        try{
            const findblog = await Blog.findById(blogid);

            if(!findblog)
            return res.status(400).json({
                success : false,
                message : "Blog has been already deleted",
    });

            try{
                const deletedblog = await Blog.findByIdAndRemove(blogid);
                const user = await User.findById(userid);

                const updateduser = user.blogs.filter( blog => blog._id!=blogid);
                
                user.blogs = updateduser;

                await user.save();

                const updatedcommentschema = await Comment.deleteMany({_id : {
                    $in : deletedblog.comments
                }});

                return res.status(200).json({
                    success : true,
                    message : "Blog gets deleted successfully!",
                    deletedblog,
        });
            }
            catch(e){
                console.log(e);
            }
        }
        catch(e){
            console.log(e);
        }
    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : e,
});
    }
}

exports.likeablog = async (req,res) => {
    try{
        const userid = req.user.id;
        const {blogid} = req.body;
        
        if(!blogid)
        return res.status(400).json({
            success : false,
            message : "Please provide a blog id",
});

        try{
            
            const blog = await Blog.findByIdAndUpdate(blogid,{
                $push : {
                    likes : userid
                },
            },{new:true});

            return res.status(200).json({
                success : true,
                message : "Like added",
                blog
    });

        }
        catch(e){
            return res.status(400).json({
                success : false,
                message : e,
    });
        }
    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : e,
});
    }
}

exports.unlikeablog = async (req,res) => {
    try{
        const userid = req.user.id;
        const {blogid} = req.body;
        
        if(!blogid)
        return res.status(400).json({
            success : false,
            message : "Please provide a blog id",
});

        try{
            
            const blog = await Blog.findByIdAndUpdate(blogid,{
                $pull : {
                    likes : userid
                },
            },{new : true});

            return res.status(200).json({
                success : true,
                message : "Like removed",
                blog
    });

        }
        catch(e){
            console.log(e);
            return res.status(400).json({
                success : false,
                e,
    });
        }
    }
    catch(e){
        console.log(e);
        return res.status(400).json({
            success : false,
            e,
});
    }
}

