import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatDate, ispresent } from "../../utils/utils";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast from "react-hot-toast";
import Comments from "../Blog/Comments";
import { useState } from "react";
import { addcomment, likeablog, unlikeablog } from "../../slices/blogslice";
import { GiSelfLove } from "react-icons/gi";
import CreateBlog from "../BlogApp/CreateBlog";
import { setloader } from "../../slices/loaderslice";
import { FaRegComment } from "react-icons/fa";
import Loader from "../Common/Loader";


function Exploreblog() {
    const {id} = useParams();
    
    const blogstate = useSelector((store) => store.blog);
    const userstate = useSelector((store) => store.user);
    const loadingstate = useSelector((store) => store.loading);
    const {loading} = loadingstate;
    const dispatch = useDispatch();

    const {blogs, createblogactive} = blogstate;
    const {_id, avatar} = userstate.user;
    const [comment, setcomment] = useState("");

    if(!blogs)
    return <h1>Loading........</h1>

    const blog = blogs.filter((blog) => blog._id===id);
    const likes = blog[0].likes;
    const commentdata = blog[0].comments;

    let liked = ispresent(_id,likes)!==-1 ? true : false;

    if(!blog[0])
    return <h1>Blog not found</h1>
    
    const {title,description,publicationdate,thumbnail} = blog[0];
    const date = formatDate(publicationdate);

    async function onclickaddcommenthandler(e){
        e.preventDefault();
        try{
            dispatch(setloader());
            const response = await fetch("http://localhost:4000/makeacomment", {
                method : "POST",
                headers : {
                    "content-type" : "application/json",
                },
                credentials : "include",
                mode : "cors",
                origin : "http://localhost:3000",
                body : JSON.stringify({
                    blogid : id,
                    description : comment,
                }),
            });
            const data = await response.json();
            if(!data.success)
            toast.error(data.message);

            if(data.success)
            {
                dispatch(addcomment({comment : data.fullcommentdata, id : id}));
                toast.success(data.message);
                setcomment("");
            }

        }catch(e){
            console.log("Server error message", e);
            toast.error("Server error");            
        }
        finally{
            dispatch(setloader());
        }
    }

    async function onclicklikehandler(){
        try{
                dispatch(setloader());
                const response = await fetch(`http://localhost:4000/${!liked ? 'likeablog' : 'unlikeablog'}`, {
                    credentials : "include",
                    method : "PUT",
                    headers : {
                        "Content-Type" : "application/json",
                    },
                    body : JSON.stringify({
                        blogid : id,
                    })
                });

                const data = await response.json();

                if(!data.success)
                toast.error(data.message);

                if(data.success)
                {
                    dispatch(!liked ? likeablog({blogid : id, userid : _id}) : unlikeablog({blogid : id, userid : _id}));
                    toast.success(data.message);
                }

            }
        catch(e){
            console.log(e);
            toast.error("Server error, Please try again later!");
        }
        finally{
            dispatch(setloader());
        }
    }

    return (
        <>
        <Navbar />
        <div className={`exploreblog ${loading ? 'active' : ''}`}>

        { loading && <Loader />}

        {createblogactive && <div className={`createblogcontainer ${createblogactive ? 'switchon' : 'switchoff'}`}>
            <CreateBlog />
        </div> }
            
            <div className="blogdata">
            <h1 style={{fontFamily : "sans-serif"}}>Selected Blog</h1>

            <div className="blogdatadivider"></div>

            <img src={thumbnail} alt="image" width={"100%"}/>

            <div className="likecommentdetailscontainer">

                <div className="explorelikedetails">
                    <GiSelfLove fontSize={"2rem"} color={liked ? "red" : "darkgrey"} onClick={onclicklikehandler}/> 
                    <p>{likes.length ? likes.length : '0'}</p>
                </div>
                
                <div className="explorecommentdetails">
                    <FaRegComment fontSize={"2rem"} color={"darkgrey"}/>   
                    <p>{commentdata.length ? commentdata.length : '0'}</p> 
                </div>

            </div>

            <h3>{title}</h3>
            <p>{description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, distinctio voluptates? Est corrupti nemo perspiciatis dolorem quibusdam fugiat ad consequatur, voluptate, autem adipisci deleniti eius unde explicabo facere distinctio possimus!</p>
            <p>{date}</p>
            </div>

            <div className="blogcomments">
                
                <div className="commentcount">
                    <h1>{commentdata.length} Comments</h1>
                </div>


                <div className="blogaddcomment">

                    <div className="useravatar">
                        <img src={avatar ? avatar : "https://api.dicebear.com/6.x/pixel-art/svg?seed=exampleeee"} alt="USER" />
                    </div>

                    <div className="inputcomment">
                        <input onChange={(e) => setcomment(e.target.value)} value={comment} placeholder="Add a comment"/>
                        <button onClick={(e) => onclickaddcommenthandler(e)}>Comment</button>
                    </div>

                </div>

                <div className="blogdatadivider"></div>

                <div className="commentcontainer">

                    {!commentdata.length && <h2 style={{margin : "auto"}}>Be the first one to comment!</h2>}

                    {commentdata.map((commentdata, index) => (
                        <Comments key={index} id={id} commentdata={commentdata} />
                    ))}

                </div>

            </div>

            </div>
        <Footer />
        </>
    );
}

export default Exploreblog;