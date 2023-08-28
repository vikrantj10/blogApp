import { useSelector } from "react-redux";
import Blog from "./Blog";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from "../../utils/utils";

function Blogs({heading, description}) {
    const state = useSelector((store) => store.blog);
    const {blogs} = state;
    
    return (
        <div className="blogs">
                <p className="blogsheading">{heading}</p>
                <p>{description}</p>

                <div className="blogdatadivider"></div>

                {blogs.length==0 && <h3>No blogs to show, currently!</h3>}

                <Carousel itemClass="blogitems" autoPlay={true} transitionDuration={200} responsive={responsive}>

                    {blogs.map((blog, index)=> (
                            <Blog key={blog._id} id={blog._id} title={blog.title} date={blog.publicationdate} thumbnail={blog.thumbnail}/>
                    ))}

                    </Carousel>
                
            </div>
    );
}

export default Blogs;