import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs : [],
    loading : true,
    createblogactive : false,
    type : "createblog",
    selectedid : "",
    deletetrigger : false,
};

const blog = createSlice(
    {
        name : "blog",
        initialState,
        reducers : {
            set(state,action){
                state.blogs = action.payload.blogs;
            },
            addcomment(state,action){
                const {id, comment} = action.payload;
                const blog = state.blogs.find((blog) => blog._id === id);
                blog.comments.push(comment);
            },
            removecomment(state,action){
                const {blogid, commentid} = action.payload;
                const blog = state.blogs.find((blog) => blog._id === blogid);
                blog.comments = blog.comments.filter((comment) => comment._id !== commentid);
            },
            likeablog(state, action) {
                const { blogid, userid } = action.payload;
                const blog = state.blogs.find((blog) => blog._id === blogid);
                blog.likes.push(userid);
            },
            unlikeablog(state, action) {
                const { blogid, userid } = action.payload;
                const blog = state.blogs.find((blog) => blog._id === blogid);
                blog.likes = blog.likes.filter((likeid) => likeid !== userid);
            },
            setcreateblogactive(state,action){
                state.createblogactive = action.payload.value;
            },
            addblog(state,action) {
                state.blogs.push(action.payload.blog);
            },
            updateblog(state, action) {
                const updatedblog = action.payload.updatedblog;
                state.blogs = state.blogs.map(blog => {
                  if (blog._id === updatedblog._id) {
                    return updatedblog;
                  } else {
                    return blog;
                  }
                });
            },
            deleteblog(state,action){
                const blogid = action.payload.blogid;
                state.blogs = state.blogs.filter((blog) => blog._id !== blogid);
            },
            setloader(state,action){
                state.loading = action.value;
            },
            settype(state,action){
                state.type = action.payload.type;
            },
            setselectedid(state,action){
                state.selectedid = action.payload.selectedid;
            },
            setdeletetrigger(state,action){
                state.deletetrigger = !state.deletetrigger;
            }
        }
    }
)

export default blog.reducer;

export const {setselectedid, setdeletetrigger, set, addcomment, deleteblog, updateblog, removecomment, likeablog, unlikeablog, setcreateblogactive, addblog, setloader, settype} = blog.actions;