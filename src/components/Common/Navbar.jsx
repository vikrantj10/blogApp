import { useDispatch, useSelector } from "react-redux";
import Blogbtn from "./Blogbtn";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from 'react-icons/ai';
import Cookies from "js-cookie";
import { set } from "../../slices/userslice"
import { toast } from "react-hot-toast";

function Navbar() {
    const userstate = useSelector((store) => store.user);
    const {user} = userstate;
    const userpresent = Object.keys(user).length !== 0;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logouthandler(){
        try {
            Cookies.remove("token");
            toast.success("Come back again!")
            dispatch(set({user : {}}));
            navigate("/");
        } catch (error) {
            toast.error("Unable to log out!")
            console.error("Logout error:", error);
        }
    }
    

    return (
        <div className="navbar">
           <nav>
            
            <div className="logoname">
                <img src="https://w7.pngwing.com/pngs/431/727/png-transparent-logo-bs-graphics-others.png" alt="logo" />
                <div className="name">
                <span style={{
                    fontWeight : "900"
                }}>BLOG</span>
                <span>SPOT</span>
                </div>
            </div>

            <div className="options">
                    <Link to={`${!userpresent ? '/' : '/BlogApp'}`}>HOME</Link>
                    <Link to={`${userpresent ? '/BlogApp/YourBlogs' : '/AllBlogs'}`} >{userpresent ? "YOUR BLOGS" : "ALL BLOGS"}</Link>
                    {!userpresent && <Link to="/UserEntryTabs/UserEntry?type=login">MEMBER</Link>}
                    {userpresent && <AiOutlineLogout onClick={logouthandler} fontSize={"1.8rem"} />}
            </div>

            <div className="tab">
                <Blogbtn title={!userpresent ? "BE OUR GUEST" : "CREATE BLOG"} link={!userpresent ? "/UserEntryTabs" : "CreateBlog"} />
            </div>

           </nav>
        </div>
    );
}

export default Navbar;