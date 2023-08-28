import { useDispatch, useSelector } from "react-redux";
import Blog from "../components/Blog/Blog";
import CreateBlog from "../components/BlogApp/CreateBlog";
import Footer from "../components/Common/Footer";
import Navbar from "../components/Common/Navbar";

function AllBlogs() {
    const blogstate = useSelector((store) => store.blog);
    const {type,blogs} = blogstate;

    return (
        <div className="allblogscontainer">
            <Navbar />
            <div className="yourblogscontainer">

                <div className="yourblogsheader">
                        <h1>All Blogs</h1>
                        <p>You can explore all blogs</p>
                </div>

                <div className="yourblogcontainer">
                    {blogs.map((blog) => 
                    <Blog key={blog._id} id={blog._id} title={blog.title} date={blog.publicationdate} thumbnail={blog.thumbnail}/> 
                    )}
                </div>

            </div>

            <Footer />
        </div>
    );
}

export default AllBlogs;