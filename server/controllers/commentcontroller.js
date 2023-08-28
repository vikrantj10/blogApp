const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

exports.makeacomment = async (req,res) => {
    try{
        const {description, blogid} = req.body;
        const userid = req.user.id;

        if(!description)
            return res.status(400).json({
                success : false,
                message : "Provide description of comment"
});
        try{
            const comment = await Comment.create({
                users : userid,
                description
            });

            const pushcommenttoblog = await Blog.findByIdAndUpdate(blogid,{
                $push : {
                    comments : comment._id
                }
            }, {new : true});

            const fullcommentdata = await Comment.findById(comment.id).populate("users");

            return res.status(200).json({
                success : true,
                message : "Comment has been added",
                fullcommentdata,
                comment,
});

        }
        catch(e){
            return res.status(400).json({
                success : false,
                message : "Error in creating comment schema",
                e,
});
        }

    }
    catch(e){
        console.log("Unable to make a comment");
        return res.status(400).json({
            success : false,
            e,
});
    }
}

exports.updatecomment = async (req,res) => {
    try{
        const {commentid, description} = req.body;
        if(!commentid || !description)
            return res.status(400).json({
            success : false,
            message : "Provide commentid and description, both"
});
        try{
            const updatedcomment = await Comment.findByIdAndUpdate(commentid,{
                $set : {
                    description
                }
            },{new : true});
            return res.status(200).json({
                success : true,
                message : "Comment has been successfully updated",
                updatedcomment,
                description
});
        }
        catch(e){
            return res.status(400).json({
                success : false,
                message : "Comment cannot be updated in the comment schema"
});
        }

    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : "Unable to update a comment",
            e
});
    }
}

exports.deletecomment = async (req,res) => {
    try{
        const {commentid, blogid} = req.body;
        if(!commentid)
        return res.status(400).json({
            success : false,
            message : "Please provide the commentid"
});
        try{
            const deletedcomment = await Comment.findByIdAndDelete(commentid);
            const deletedidfromblog = await Blog.findByIdAndUpdate(blogid,{
                $pull : {
                    comments : commentid,
                }
            }, {new : true});

            return res.status(200).json({
                success : true,
                message : "Comment gets deleted successfully",
                deletedcomment,
                deletedidfromblog,
});
        }
        catch(e){
            return res.status(400).json({
                success : false,
                message : "Comment cannot be deleted in comment schema"
});
        }
    }
    catch(e){
        return res.status(400).json({
            success : false,
            message : "Unable to delete the comment",
            e
});
    }
}