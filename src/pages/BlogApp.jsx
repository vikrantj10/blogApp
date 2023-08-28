import { useSelector } from "react-redux";
import Banner from "../components/Common/Banner";
import Blogs from "../components/Blog/Blogs";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import CreateBlog from "../components/BlogApp/CreateBlog";

function BlogApp() {
    const blogstate = useSelector((store) => store.blog);
    const loadingstate = useSelector(((store) => store.loading));
    const {loading} = loadingstate;
    const {createblogactive} = blogstate;

    return (
        <>
        <Navbar />
        <div className={`blogapp ${createblogactive ? 'active' : ''}`}>
            <Banner title="Create & Read Blogs" src="https://images.unsplash.com/photo-1578589335615-9e804277a5af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3MlMjBhbmQlMjBsYXB0b3B8ZW58MHx8MHx8fDA%3D&w=1000&q=80" />
            <Blogs heading="Weekly Articles with insight into the weekend's message" description="Our blog takes the message from the weekend and lays out next right steps, so you can hear a message and do a message in practical ways"/>
        </div>

        {createblogactive && <div className={`createblogcontainer ${createblogactive ? 'switchon' : 'switchoff'}`}>
            <CreateBlog />
        </div> }
        
        <Footer />
        </>
    );
}

export default BlogApp;