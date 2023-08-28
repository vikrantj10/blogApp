import { useDispatch, useSelector } from "react-redux";
import Blog from "../Blog/Blog";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CreateBlog from "./CreateBlog";
import { setloader } from "../../slices/loaderslice";

function YourBlogs() {

    const [blogs,setblogs] = useState([]);
    const blogstate = useSelector((store) => store.blog);
    const {createblogactive,deletetrigger} = blogstate;
    const loadingstate = useSelector((store) => store.loading);
    const {loading} = loadingstate;
    const dispatch = useDispatch();

    async function getalluserdetails(){
        try{
            dispatch(setloader());
            const response = await fetch("http://localhost:4000/getuserdetails", {
                credentials : "include",
            });
            const data = await response.json();
            setblogs(data.user.blogs);
        }catch(e){
            console.log(e);
            toast.error("Server error, Please try again later!");
        }
        finally{
            dispatch(setloader());
        }
    }

    useEffect(() => {
        getalluserdetails();
    },[createblogactive,deletetrigger])

    return (
        <div className={`yourblogs ${loading ? 'active' : ''}`}>
            <Navbar />
            
            <div className="yourblogscontainer">

                <div className="yourblogsheader">
                        <h1>Your Blogs</h1>
                        <p>You can explore, edit and delete your blogs</p>
                </div>

                {blogs.length==0 && <h3>No blogs to show, currently!</h3>}

                <div className="yourblogcontainer">
                    {blogs.map((blog) => 
                    <Blog key={blog._id} id={blog._id} title={blog.title} date={blog.publicationdate} thumbnail={blog.thumbnail} totallike={blog.likes.length} totalcomments={blog.comments.length}/> 
                    )}
                </div>

            </div>

            {createblogactive && <div className={`createblogcontainer ${createblogactive ? 'switchon' : 'switchoff'}`}>
            <CreateBlog />
            </div> }

            <Footer />
        </div>
    );
}

export default YourBlogs;