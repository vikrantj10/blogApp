import { NavLink, useLocation } from "react-router-dom";
import { formatDate } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import {BiSolidEditAlt} from "react-icons/bi";
import { GiSelfLove } from "react-icons/gi";
import { FaDeleteLeft, FaRegComment } from "react-icons/fa6"
import { deleteblog, setcreateblogactive, setdeletetrigger, setselectedid, settype } from "../../slices/blogslice";
import { toast } from "react-hot-toast";
import { setloader } from "../../slices/loaderslice";

function Blog({id, title, date, thumbnail, totallike, totalcomments}) {

    const userstate = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const {user} = userstate;
    const userpresent = Object.keys(user).length !== 0;

    const location = useLocation();
    const url = location.pathname;
    const parts = url.split("/");
    const lastpart = parts[parts.length-1];

    async function oneditbloghandler(){
        dispatch(settype({type : "updateblog"}));
        dispatch(setcreateblogactive({value : true}));
        dispatch(setselectedid({selectedid : id}));
    }
    
    async function ondeletebloghandler(){
        try{
            dispatch(setloader());
            dispatch(setdeletetrigger());
            dispatch(settype({type : "deleteblog"}));
            const response = await fetch(`http://localhost:4000/deleteblog`, {
                method : "DELETE",
                headers : {
                  "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    blogid : id,
                }),
                credentials : "include",
              });
              const data = await response.json();
    
            if(!data.success)
            toast.error(data.message);

            dispatch(deleteblog({blogid : id}));
            toast.success(data.message);
        }catch(e){
            console.log(e);
            toast.error("Server error, Please try again later!");
        }
        finally{
            dispatch(setloader());
            dispatch(setdeletetrigger());
        }
    }

    date = formatDate(date);
    let path = `/Home/${id}`;
    return (
        <div className="blog">
            <img src={thumbnail} alt="Image" width={"100%"}/>

            {userpresent && lastpart==="YourBlogs" && <div className="blogfeature">

                <div className="totallikes">
                    <GiSelfLove />
                    <p>{totallike ? totallike : '0'}</p>
                </div>

                <div className="explorecommentdetails">
                    <FaRegComment />   
                    <p>{totalcomments ? totalcomments : '0'}</p>
                </div>
                
                <div className="editdelete">
                    <BiSolidEditAlt onClick={oneditbloghandler}/>
                    <FaDeleteLeft onClick={ondeletebloghandler}/>
                </div>

            </div>}

            <div className="blogtext">
            <h4>{title}</h4>
            <p style={{fontSize : "0.8em"}}>{date}</p>
            <NavLink to={path} style={{fontSize : "1rem", color : "#7a28ff", textTransform : "uppercase", textDecoration : "none"}}>
                View this resourse</NavLink>
            </div>
        </div>
    );
}

export default Blog;